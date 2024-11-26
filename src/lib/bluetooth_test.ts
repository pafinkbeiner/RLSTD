function generateRandomBuffer() {
  const randomArray = new Uint8Array(16);
  window.crypto.getRandomValues(randomArray);
  return randomArray; 
}

export const test_navigator = {
  bluetooth: {
    requestDevice: async function (): Promise<any> {
      return {
        name: "TEST",
        gatt: {
          connect: async function () {
            return {
              getPrimaryService: async function (_: BluetoothServiceUUID) {
                return {
                  getCharacteristic: async function (_: BluetoothCharacteristicUUID) {
                    return {
                      startNotifications: async function () { },
                      addEventListener: async function (_: "characteristicvaluechanged", listener: (this: any, ev: any) => any) {
                        setInterval(async () => {
                          const event = {
                            type: "characteristicvaluechanged",
                            target: {
                              value: generateRandomBuffer(), // Wrap the buffer in a DataView for access
                            },
                          };
                          await listener.call(this, event);
                        }, 2000)
                      },
                      writeValue: async function (_: BufferSource): Promise<void> {
                        return new Promise((r, _) => r());
                      },
                      readValue: async function (): Promise<DataView> {
                        return new Promise((resolve, _) => resolve(new DataView(generateRandomBuffer().buffer)))
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}