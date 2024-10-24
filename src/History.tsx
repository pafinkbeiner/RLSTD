import { useEffect, useState } from "react";
import { ModeToggle } from "./components/mode-toggle"
import { Training } from "./types/Training";
import { PassivTrainingChart } from "./components/PassivTrainingChart";

export const FINISHED_TRAINING_PREFIX = "finished-training-";

const History = () => {

  const [trainings, setTrainings] = useState<Training[]>([])

  const refreshState = () => {
    setTrainings([]);
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      if (key !== null && key.startsWith(FINISHED_TRAINING_PREFIX)) {
        const training = JSON.parse(localStorage.getItem(key)!);
        setTrainings((prevTrainings: any) => [...prevTrainings, training]);
      }
    }
  }

  const deleteTraining = (id: string) => {
    console.log(id)
    if(localStorage.getItem(`${FINISHED_TRAINING_PREFIX}${id}`) !== null){
      console.log("Found: " +localStorage.getItem(`${FINISHED_TRAINING_PREFIX}${id}`) )
      localStorage.removeItem(`${FINISHED_TRAINING_PREFIX}${id}`);
    }
    refreshState();
  }

  useEffect(() => {
    refreshState();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="pb-5">Finished Trainings</h1>
      <div className="flex flex-row gap-3 items-center">
        { trainings.map((training: Training) => {
          return (
            <PassivTrainingChart deleteTraining={() => deleteTraining(training.id)} training={training}/>
          )
        }) }
      </div>
    </div>
  )
}

export default History