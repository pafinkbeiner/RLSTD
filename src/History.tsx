import { useEffect, useState } from "react";
import { ModeToggle } from "./components/mode-toggle"
import { FinishedTraining, Training } from "./types/Training";
import { PassivTrainingChart } from "./components/PassivTrainingChart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export const FINISHED_TRAINING_PREFIX = "finished-training-";

const History = () => {

  const [trainings, setTrainings] = useState<Training[]>([])
  const [selectedTraining, setSelectedTraining] = useState<FinishedTraining>()

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
    if (localStorage.getItem(`${FINISHED_TRAINING_PREFIX}${id}`) !== null) {
      console.log("Found: " + localStorage.getItem(`${FINISHED_TRAINING_PREFIX}${id}`))
      localStorage.removeItem(`${FINISHED_TRAINING_PREFIX}${id}`);
    }
    refreshState();
  }

  useEffect(() => {
    refreshState();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="pb-5">Finished Trainings</h1>

      {selectedTraining &&
        <PassivTrainingChart deleteTraining={() => deleteTraining(selectedTraining.id)} training={selectedTraining} />
      }

      <Table className="mt-3">
        <TableCaption>Recently finished Trainings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Targeted Training Time (s)</TableHead>
            <TableHead>Currently Displayed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainings.map((training: Training) => {
            return (
              <TableRow className="cursor-pointer" onClick={() => setSelectedTraining(training)}>
                <TableCell>{training.title}</TableCell>
                <TableCell>{training.description ?? "-"}</TableCell>
                <TableCell>{training.targetedTrainingTime}</TableCell>
                <TableCell>{training.id == selectedTraining?.id && "Yes"}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {/* <div className="flex flex-row gap-3 items-center">
        { trainings.map((training: Training) => {
          return (
            <PassivTrainingChart deleteTraining={() => deleteTraining(training.id)} training={training}/>
          )
        }) }
      </div> */}
    </div>
  )
}

export default History