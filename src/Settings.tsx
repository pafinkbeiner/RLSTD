import { ModeToggle } from "./components/mode-toggle"
import { TrainingRepositories } from "./components/TrainingRepositories"

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row gap-3 items-center">
        <p>Current Mode:</p> <ModeToggle/>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <TrainingRepositories/>
      </div>
    </div>
  )
}

export default Settings