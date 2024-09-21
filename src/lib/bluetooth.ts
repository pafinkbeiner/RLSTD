import { BehaviorSubject, Subject } from "rxjs";

export const status: Subject<string> = new Subject();
export const connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

// Notify
export const notify_0x2A63: Subject<DataView> = new Subject();
export const notify_0x2AD3: Subject<DataView> = new Subject();
export const notify_0x2ADA: Subject<DataView> = new Subject();
export const notify_0x2AD2: Subject<DataView> = new Subject();

// Read
export let read_0x2A65: {value: Subject<DataView>, refresh: () => Promise<DataView>};
export let read_0x2A5D: {value: Subject<DataView>, refresh: () => Promise<DataView>};
export let read_0x2ACC: {value: Subject<DataView>, refresh: () => Promise<DataView>};
export let read_0x2AD6: {value: Subject<DataView>, refresh: () => Promise<DataView>};
export let read_0x2AD8: {value: Subject<DataView>, refresh: () => Promise<DataView>};

export let device: BluetoothDevice | undefined = undefined;

export const disconnect = () => {
  if(device){
    const deviceName = device.name;
    device.gatt?.disconnect();
    status.next("Disconnected from: " + deviceName);
    connected.next(false);
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

    const evListener = (subject: Subject<any>) => {
        return (event: Event) => {
            const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
            if (!value) return;
            const data = new DataView(value.buffer);
            subject.next(data);
        }
    }

    const c_0x2A63 = await cyclingPowerService.getCharacteristic(0x2A63);   // Cycling Power Measurement
    const c_0x2AD3 = await fitnessMachineService.getCharacteristic(0x2AD3); // Training Status
    const c_0x2ADA = await fitnessMachineService.getCharacteristic(0x2ADA); // Fitness Machine Status
    const c_0x2AD2 = await fitnessMachineService.getCharacteristic(0x2AD2); // Indoor Bike Data

    await c_0x2A63.startNotifications();
    await c_0x2AD3.startNotifications();
    await c_0x2ADA.startNotifications();
    await c_0x2AD2.startNotifications();

    c_0x2A63.addEventListener("characteristicvaluechanged", evListener(notify_0x2A63));
    c_0x2AD3.addEventListener("characteristicvaluechanged", evListener(notify_0x2AD3));
    c_0x2ADA.addEventListener("characteristicvaluechanged", evListener(notify_0x2ADA));
    c_0x2AD2.addEventListener("characteristicvaluechanged", evListener(notify_0x2AD2));

    const addRead = (c: BluetoothRemoteGATTCharacteristic): {value: Subject<DataView>, refresh: () => Promise<DataView>} => {
      const refresh = async (): Promise<DataView> => {
        const v: DataView = await c.readValue();
        return v;
      }
      return {
        value: new Subject(),
        refresh: refresh 
      }
    }

    const c_0x2A65 = await cyclingPowerService.getCharacteristic(0x2A65);   // Cycling Power Feature
    const c_0x2A5D = await cyclingPowerService.getCharacteristic(0x2A5D);   // Sensor Location (Other)
    const c_0x2ACC = await fitnessMachineService.getCharacteristic(0x2ACC); // Fitness Machine Feature
    const c_0x2AD6 = await fitnessMachineService.getCharacteristic(0x2AD6); // Supported Resistance Level Range
    const c_0x2AD8 = await fitnessMachineService.getCharacteristic(0x2AD8); // Supported Power Range

    read_0x2A65 = addRead(c_0x2A65);
    read_0x2A5D = addRead(c_0x2A5D);
    read_0x2ACC = addRead(c_0x2ACC);
    read_0x2AD6 = addRead(c_0x2AD6);
    read_0x2AD8 = addRead(c_0x2AD8);

    status.next(`Status: Connected to ${device.name}`);
    connected.next(true);
  } catch (error) {
    status.next(`Error: ${(error as Error).message}`);
  }
}


//   const data = new DataView(value.buffer);
//   const power = data.getUint16(2, true); // Read power from the characteristic value


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
