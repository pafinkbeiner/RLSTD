import { Button } from "./components/ui/button"
import { write_0x2AD9 } from "./lib/bluetooth"
import { opCodes_0x2AD9 } from "./lib/convert"

const Training = () => {
  return (
    <>
      <p>Training</p>
      <Button onClick={async () => await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.requestControl]))}>Request Control</Button>
      <Button onClick={async () => await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.startOrResume]))}>Start or Resume</Button>
      <Button onClick={async () => await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, 100]))}>Set To 100 Watt</Button>
      <Button onClick={async () => await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, 300]))}>Set To 300 Watt</Button>
      <Button onClick={async () => await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, 500]))}>Set To 500 Watt</Button>
      <Button onClick={async () => await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.stopOrPause]))}>Stop or Pause</Button>
    </>
  )
}

export default Training