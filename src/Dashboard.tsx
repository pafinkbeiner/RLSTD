import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { connect, disconnect, status, connected, notify_0x2AD2, notify_0x2A63 } from './lib/bluetooth'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ConnectedState from './components/ConnectedState'
import { convert_0x2A63, convert_0x2AD2 } from './lib/convert'
import { SpeedChart } from './SpeedChart'
import { ModeToggle } from './components/mode-toggle'
import BaseLayout from './BaseLayout'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './components/ui/navigation-menu'
import NavigationPanel from './components/NavigationPanel'
import InformationCard from './components/InformationCard'
import { Card } from './components/ui/card'
import FlagsBox from './components/FlagsBox'

function Dashboard() {

  const [statusText, setStatusText] = useState("Status: Not connected");
  const [isConnected, setIsConnected] = useState<boolean>(connected.getValue());

  const [accumulatedTorque, setAccumulatedTorque] = useState<number | undefined>(0);

  useEffect(() => {
    const sub_0x2A63 = notify_0x2A63.asObservable().subscribe(v => {
      const value = convert_0x2A63(v);
      setAccumulatedTorque(value.accumulatedTorque)
    });
    const sub_status = status.asObservable().subscribe(s => setStatusText(s));
    const sub_connected = connected.asObservable().subscribe(c => setIsConnected(c));

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

      <div className='mb-5 mt-5 flex gap-1 justify-center'>
        <Button onClick={connect}>Connect to Wahoo Kickr Core</Button>
        <Button onClick={disconnect}>Disconnect Bluetooth Device</Button>
      </div>

      <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
        <InformationCard title="Torque" value={accumulatedTorque} desc="Accumulated Torque" />
        <InformationCard title="Torque" value={accumulatedTorque} desc="Accumulated Torque" />
        <InformationCard title="Torque" value={accumulatedTorque} desc="Accumulated Torque" />
        <InformationCard title="Torque" value={accumulatedTorque} desc="Accumulated Torque" />
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-5 flex-wrap'>
        <SpeedChart size={100} title="Speed" description="Thats the current Speed" data={notify_0x2AD2} getter={(v) => convert_0x2AD2(v).instantaneousSpeed} />
        <FlagsBox />
      </div>

      <Alert className='w-80 absolute top-5 right-5'>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          {statusText}
        </AlertDescription>
      </Alert>

      {/* <ConnectedState isConnected={isConnected} /> */}

      {/* <SpeedChart size={100} title="Speed" description="Thats the current Speed" data={notify_0x2AD2} getter={(v) => convert_0x2AD2(v).instantaneousSpeed} /> */}

    </>
  )
}

export default Dashboard
