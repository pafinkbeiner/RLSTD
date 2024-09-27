import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { connect, disconnect, status, connected, notify_0x2AD2 } from './lib/bluetooth'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ConnectedState from './components/ConnectedState'
import { convert_0x2AD2 } from './lib/convert'
import { SpeedChart } from './SpeedChart'
import { ModeToggle } from './components/mode-toggle'
import BaseLayout from './BaseLayout'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './components/ui/navigation-menu'
import NavigationPanel from './components/NavigationPanel'

function App() {

  const [statusText, setStatusText] = useState("Status: Not connected");
  const [isConnected, setIsConnected] = useState<boolean>(connected.getValue());

  useEffect(() => {
    status.asObservable().subscribe(s => setStatusText(s));
    connected.asObservable().subscribe(c => setIsConnected(c));
  }, [])

  return (
    <BaseLayout>
      <div className='flex flex-col items-center justify-between h-full'>

        <div className='p-8'>
          <h1 className="mb-5 text-4xl font-extrabold">
            RLSTD
          </h1>
        </div>

        <Alert className='w-80 absolute top-5 right-5'>
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            {statusText}
          </AlertDescription>
        </Alert>

        {/* <ConnectedState isConnected={isConnected} /> */}

        <div className='mb-5 mt-5 flex gap-1 justify-center'>
          <Button onClick={connect}>Connect to Wahoo Kickr Core</Button>
          <Button onClick={disconnect}>Disconnect Bluetooth Device</Button>
        </div>

        {/* <SpeedChart size={100} title="Speed" description="Thats the current Speed" data={notify_0x2AD2} getter={(v) => convert_0x2AD2(v).instantaneousSpeed} /> */}

        <NavigationPanel className='justify-self-end' />

      </div>
    </BaseLayout>
  )
}

export default App
