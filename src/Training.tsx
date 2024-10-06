import { useEffect, useState } from "react";
import { Button } from "./components/ui/button"
import { connect, connected, disconnect, notify_0x2AD2, write_0x2AD9 } from "./lib/bluetooth"
import { convert_0x2AD2, numToUint8Array, opCodes_0x2AD9 } from "./lib/convert"
import ConnectivityIndicator from "./components/ConnectivityIndicator";
import InformationCard from "./components/InformationCard";
import { Gauge, RotateCwIcon, Zap } from "lucide-react";
import { TrainingChart } from "./components/TrainingChart";
import { exampleTraining } from "./types/Training";

const Training = () => {

  const [isConnected, setIsConnected] = useState(false);

  const [instantaneousPower, setInstantaneousPower] = useState<number | undefined>(0);
  const [instantaneousCadence, setInstantaneousCadence] = useState<number | undefined>(0);
  const [instantaneousSpeed, setInstantaneousSpeed] = useState<number | undefined>(0);

  useEffect(() => {
    const sub_connected = connected.asObservable().subscribe(v => {
      setIsConnected(v);
    });
    const sub_0x2AD2 = notify_0x2AD2.asObservable().subscribe(v => {
      const value = convert_0x2AD2(v);
      setInstantaneousPower(value.instantaneousPower);
      setInstantaneousCadence(value.instantaneousCadence);
      setInstantaneousSpeed(value.instantaneousSpeed);
    });

    return () => {
      sub_connected.unsubscribe();
      sub_0x2AD2.unsubscribe();
    }
  })

  return (
    <>
      <p>Training</p>
      <ConnectivityIndicator onClick={isConnected ? () => disconnect() : async () => await connect()} className="position-absolute top-0 right-0" connected={isConnected} />
      {/* <div className="flex flex-row items-center justify-center gap-2">
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.requestControl])))}>Request Control</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.startOrResume])))}>Start or Resume</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, ...numToUint8Array(100)])))}>Set To 100 Watt</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, ...numToUint8Array(255)])))}>Set To 255 Watt</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, ...numToUint8Array(400)])))}>Set To 400 Watt</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.stopOrPause])))}>Stop or Pause</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.reset])))}>Reset</Button>
        <Button onClick={async () => console.log(await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setSpinDownControl])))}>Spin Down Control</Button>
      </div> */}
      <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
        <InformationCard icon={<Zap height={20} width={20} />} title="Instantaneous Power" value={instantaneousPower} desc="Instantaneous Power" unit={"W"} />
        <InformationCard icon={<RotateCwIcon height={20} width={20} />} title="Instantaneous Cadence" value={instantaneousCadence} desc="Instantaneous Cadence" unit={"per min"} />
        <InformationCard icon={<Gauge height={20} width={20} />} title="Instantaneous Speed" value={instantaneousSpeed} desc="Instantaneous Speed" unit={"km/h"} />
      </div>
      <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
        <TrainingChart training={exampleTraining} />
      </div>
      <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
        <Button onClick={async () => await exampleTraining.start()}>Start Training</Button>
        <Button onClick={async () => exampleTraining.continue()}>Continue Training</Button>
        <Button onClick={async () => exampleTraining.pause()}>Pause Training</Button>
        <Button onClick={async () => exampleTraining.stop()}>Stop Training</Button>
      </div>
    </>
  )
}

export default Training