import { ModeToggle } from "./components/mode-toggle"

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row gap-3 items-center">
        <p>Current Mode:</p> <ModeToggle/>
      </div>
    </div>
  )
}

export default Settings