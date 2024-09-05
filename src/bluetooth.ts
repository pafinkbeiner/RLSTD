import { BehaviorSubject, Subject } from "rxjs";

export const valueMapNotify: Map<BluetoothServiceUUID, Subject<any>> = new Map();
export const valueMapRead: Map<BluetoothServiceUUID, {value: Subject<any>, refresh: Promise<DataView>}> = new Map();
export let device: BluetoothDevice | undefined = undefined;
export const status: Subject<string> = new Subject();

export const disconnect = () => {
  if(device){
    const deviceName = device.name;
    device.gatt?.disconnect();
    status.next("Disconnected from: " + deviceName);
  }
}

export const connect = async () => {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [
        {
          services: [
            0x1818, // cycling_power
            0x1826, // fitness_machine
          ],
        },
      ],
    });

    status.next(`Status: Connecting to ${device.name}...`);

    // Connect to the GATT server
    const server = await device.gatt!.connect();
    console.log("GATT server connected");

    // Debug: Print Available Services and Characteristics
    const services = await server.getPrimaryServices();
    for (const service of services) {
      console.log(`Service: ${service.uuid}`);
      const characteristics = await service.getCharacteristics();
      for (const characteristic of characteristics) {
        console.log(`   Characteristic: ${characteristic.uuid}`);
      }
    }

    // Services
    const cyclingPowerService = await server.getPrimaryService(0x1818);
    const fitnessMachineService = await server.getPrimaryService(0x1826);

    // Notify Characteristic
    const cpsNotifyCharacteristics = [0x2A63];
    const fmsNotifyCharacteristics = [0x2AD3, 0x2ADA, 0x2AD2];

    const evListener = (cid: number, transformer?: (dv: DataView) => DataView) => {
        return (event: Event) => {
            const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
            if (!value) return;
            const data = transformer ? transformer(new DataView(value.buffer)) : new DataView(value.buffer);
            if(valueMapNotify.has(cid)){
                valueMapNotify.get(cid)?.next(data);
            } else {
                valueMapNotify.set(cid, new BehaviorSubject(data));
            } 
        }
    }

    cpsNotifyCharacteristics.forEach(async (cid: number) => {
        const c = await cyclingPowerService.getCharacteristic(cid);
        await c.startNotifications();
        c.addEventListener("characteristicvaluechanged", evListener(cid));
    });

    fmsNotifyCharacteristics.forEach(async (cid: number) => {
        const c = await fitnessMachineService.getCharacteristic(cid);
        await c.startNotifications();
        c.addEventListener("characteristicvaluechanged", evListener(cid));
    });

    // Initial Read Characteristics
    const cpsReadCharacteristics = [0x2A65, 0x2A5D];
    const fmsReadCharacteristics = [0x2ACC, 0x2AD6, 0x2AD8];

    cpsReadCharacteristics.forEach(async (cid: number) => {
        const refresh = new Promise<DataView>(async (resolve, _) => {
            const c = await cyclingPowerService.getCharacteristic(cid);
            const v: DataView = await c.readValue();
            resolve(v);
        });
        valueMapRead.set(cid, {
            value: new BehaviorSubject(await Promise.resolve(refresh)),
            refresh: refresh
        });
    });

    fmsReadCharacteristics.forEach(async (cid: number) => {
        const refresh = new Promise<DataView>(async (resolve, _) => {
            const c = await fitnessMachineService.getCharacteristic(cid);
            const v: DataView = await c.readValue();
            resolve(v);
        });
        valueMapRead.set(cid, {
            value: new BehaviorSubject(await Promise.resolve(refresh)),
            refresh: refresh
        });
    });
    status.next(`Status: Connected to ${device.name}`);
  } catch (error) {
    status.next(`Error: ${(error as Error).message}`);
  }
}

// Function to handle received power measurement data
function handlePowerMeasurement(event: Event) {
  const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
  if (!value) return;
  const data = new DataView(value.buffer);
  console.log("DATA: ", data);
  const power = data.getUint16(2, true); // Read power from the characteristic value

  document.getElementById("output")!.textContent = `Power: ${power} Watts`;
}

// Get Cycling Power Control Point Characteristic (for resistance control)
// let powerControlCharacteristic = await cyclingPowerService.getCharacteristic(0x2A66); // cycling_power_control_point

// Listen for changes in the resistance input slider
// document.getElementById("resistance")?.addEventListener("input", async (event) => {
//   const targetPower = parseInt((event.target as HTMLInputElement).value); // Target power from slider
//   document.getElementById("resistanceLevel")!.textContent = targetPower.toString();

//   if (!powerControlCharacteristic) {
//     alert("Please connect to the trainer first.");
//     return;
//   }

//   try {
//     console.log("Sending control request (OpCode 0x00)");

//     // 1. Send control request (OpCode 0x00)
//     const controlRequest = new Uint8Array([0x00]); // OpCode 0x00
//     await powerControlCharacteristic.writeValue(controlRequest);

//     console.log("Control request sent. Now setting target power...");

//     // 2. Build the command to set the target power (OpCode 0x05)
//     const targetPowerValue = new DataView(new ArrayBuffer(3));
//     targetPowerValue.setUint8(0, 0x05); // OpCode 0x05 for Set Target Power
//     targetPowerValue.setInt16(1, targetPower, true); // Target power as SINT16 (2 bytes)

//     // 3. Send the command to set the target power
//     await powerControlCharacteristic.writeValue(targetPowerValue);
//     console.log(`Target Power set to ${targetPower}W`);

//     // 4. Start notifications to check the response
//     await powerControlCharacteristic.startNotifications();
//     powerControlCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
//       const response = new Uint8Array((event.target as BluetoothRemoteGATTCharacteristic).value!.buffer);
//       console.log("Response received:", response);

//       if (response[0] === 0x80) {
//         // Check if it's a response (OpCode 0x80)
//         const requestOpCode = response[1]; // The OpCode of the original request (e.g., 0x05 for Target Power)
//         const resultCode = response[2]; // The result code (0x01 for success, others for error)

//         if (requestOpCode === 0x05 && resultCode === 0x01) {
//           console.log("Target power successfully set!");
//         } else {
//           console.log(`Failed to set target power. Error code: ${resultCode}`);
//         }
//       }
//     });
//   } catch (error) {
//     console.error(`Failed to set target power: ${(error as Error).message}`);
//   }
// });
