import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { connect, disconnect, status, connected, notify_0x2AD2, notify_0x2A63, read_0x2AD6, read_0x2AD8 } from './lib/bluetooth'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { convert_0x2A63, convert_0x2AD2, convert_0x2AD6, convert_0x2AD8 } from './lib/convert'
import { SpeedChart } from './SpeedChart'
import InformationCard from './components/InformationCard'
import FlagsBox from './components/FlagsBox'
import { TrainingOverviewCard } from './components/TrainingOverviewCard'

function Dashboard() {

  const [statusText, setStatusText] = useState("Status: Not connected");
  const [isConnected, setIsConnected] = useState<boolean>(connected.getValue());

  const [accumulatedTorque, setAccumulatedTorque] = useState<number | undefined>(0);
  const [maximumResistanceLevel, setMaximumResistanceLevel] = useState<number | undefined>(0);
  const [minimumResistanceLevel, setMinimumResistanceLevel] = useState<number | undefined>(0);
  const [maximumPowerLevel, setMaximumPowerLevel] = useState<number | undefined>(0);
  const [minimumPowerLevel, setMinimumPowerLevel] = useState<number | undefined>(0);

  const refresh = () => {
    read_0x2AD6?.refresh().then(v => {
      const value = convert_0x2AD6(v);
      setMaximumResistanceLevel(value.maximumResistanceLevel);
      setMinimumResistanceLevel(value.minimumResistanceLevel);
    });
    read_0x2AD8?.refresh().then(v => {
      const value = convert_0x2AD8(v);
      setMaximumPowerLevel(value.maximumPower);
      setMinimumPowerLevel(value.minimumPower);
    });
  }

  useEffect(() => {
    const sub_0x2A63 = notify_0x2A63.asObservable().subscribe(v => {
      const value = convert_0x2A63(v);
      setAccumulatedTorque(value.accumulatedTorque)
    });

    const sub_status = status.asObservable().subscribe(s => setStatusText(s));
    const sub_connected = connected.asObservable().subscribe(c => {
      setIsConnected(c)
      refresh();
    });

    return () => {
      sub_0x2A63.unsubscribe();
      sub_status.unsubscribe();
      sub_connected.unsubscribe();
    }
  }, [])

  return (
    <>
      <h1 className="text-4xl font-extrabold">
        RLSTD
      </h1>

      <div className='mb-2 mt-2 flex gap-2 justify-center flex-wrap'>
        <Button disabled={isConnected} onClick={connect}>Connect to Wahoo Kickr Core</Button>
        <Button disabled={!isConnected} onClick={disconnect}>Disconnect Bluetooth Device</Button>
      </div>

      <Alert className='w-80 mb-2'>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          {statusText}
        </AlertDescription>
      </Alert>

      <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
        <InformationCard title="Maximum Resistance Level" value={maximumResistanceLevel} desc="Maximum Resistance Level" unit={"N"} />
        <InformationCard title="Minimum Resistance Level" value={minimumResistanceLevel} desc="Minimum Resistance Level" unit={"N"} />
        <InformationCard title="Maximum Power Level" value={maximumPowerLevel} desc="Maximum Power Level" unit={"W"} />
        <InformationCard title="Minimum Power Level" value={minimumPowerLevel} desc="Minimum Power Level" unit={"W"} />
        <InformationCard title="Accumulated Torque" value={accumulatedTorque} desc="Accumulated Torque" unit={"Nm"} />
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-5 flex-wrap'>
        <SpeedChart size={100} title="Speed" description="Thats the current Speed" data={notify_0x2AD2} getter={(v) => convert_0x2AD2(v).instantaneousSpeed} />
        <FlagsBox />
        <TrainingOverviewCard />
      </div>

      {/* <ConnectedState isConnected={isConnected} /> */}

      {/* <SpeedChart size={100} title="Speed" description="Thats the current Speed" data={notify_0x2AD2} getter={(v) => convert_0x2AD2(v).instantaneousSpeed} /> */}

    </>
  )
}

export default Dashboard
