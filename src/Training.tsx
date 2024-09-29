import { useEffect, useState } from "react";
import { Button } from "./components/ui/button"
import { connect, connected, disconnect, write_0x2AD9 } from "./lib/bluetooth"
import { opCodes_0x2AD9 } from "./lib/convert"
import ConnectivityIndicator from "./components/ConnectivityIndicator";

const Training = () => {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const sub_connected = connected.asObservable().subscribe(v => {
      setIsConnected(v);
    });

    return () => {
      sub_connected.unsubscribe();
    }
  })

  return (
    <>
      <p>Training</p>
      <ConnectivityIndicator onClick={isConnected ? () => disconnect() : async () => await connect()} className="position-absolute top-0 right-0" connected={isConnected} />
      <div className="flex flex-row items-center justify-center gap-2">
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.requestControl])))}>Request Control</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.startOrResume])))}>Start or Resume</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, 100])))}>Set To 100 Watt</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, 300])))}>Set To 300 Watt</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, 500])))}>Set To 500 Watt</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.stopOrPause])))}>Stop or Pause</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.reset])))}>Reset</Button>
      </div>
    </>
  )
}

export default Training