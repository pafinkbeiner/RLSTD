import { BehaviorSubject, Subject } from "rxjs";
import { test_navigator } from "./bluetooth_test";

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

// Write
export let write_0x2A66: (value: BufferSource) => Promise<DataView | undefined>;
export let write_0x2AD9: (value: BufferSource) => Promise<DataView | undefined>;

export let device: BluetoothDevice | undefined = undefined;

export const disconnect = () => {
  if(device){
    const deviceName = device.name;
    device.gatt?.disconnect();
    status.next("Disconnected from: " + deviceName);
    connected.next(false);
    device = undefined;
  }
}

export const connect = async () => {
  try {

    // Added for Testing in Development Environment
    if(process.env.NODE_ENV === "development"){
      device = await test_navigator.bluetooth.requestDevice();
    }else {
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
    }

    // Added for Testing in Development Environment
    if(device === undefined){
      return;
    }

    status.next(`Status: Connecting to ${device.name}...`);

    // Connect to the GATT server
    const server = await device.gatt!.connect();
    console.log("GATT server connected");

    // Services
    const cyclingPowerService = await server.getPrimaryService(0x1818);
    const fitnessMachineService = await server.getPrimaryService(0x1826);

    // Notify
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

    // Read
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

    // Write
    const c_0x2A66 = await cyclingPowerService.getCharacteristic(0x2A66);   // Cycling Power Control Point
    const c_0x2AD9 = await fitnessMachineService.getCharacteristic(0x2AD9); // Fitness Machine Control Point

    const addChangeHandler = (c: BluetoothRemoteGATTCharacteristic): (value: BufferSource) => Promise<DataView | undefined> => {
      return async (value: BufferSource) => {
        await c.writeValue(value);
        return c.value;
      }
    }

    write_0x2A66 = addChangeHandler(c_0x2A66);
    write_0x2AD9 = addChangeHandler(c_0x2AD9);

    status.next(`Status: Connected to ${device.name}`);
    connected.next(true);
  } catch (error) {
    status.next(`Error: ${(error as Error).message}`);
  }
}