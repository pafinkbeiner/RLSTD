import { ModeToggle } from "./components/mode-toggle"
import AddRepository from "./components/Repositories/AddRepository"
import { TrainingRepositories } from "./components/Repositories/TrainingRepositories"

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="self-start text-lg font-bold">Light / Dark Mode</h1>
      <div className="flex flex-row gap-3 items-center">
        <p>Current Mode:</p> <ModeToggle/>
      </div>
      <h1 className="self-start text-lg font-bold">Repositories</h1>
      <div className="flex flex-row gap-3 items-center">
        <TrainingRepositories/>
      </div>
      <AddRepository/>
    </div>
  )
}

export default Settings