import { useEffect, useState } from "react";
import { ModeToggle } from "./components/mode-toggle"
import { ExtMetric, FinishedTraining, Training } from "./types/Training";
import { PassivTrainingChart } from "./components/AddTraining/PassivTrainingChart";
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

  const [trainings, setTrainings] = useState<FinishedTraining[]>([])
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

  const sortFunc = (a: FinishedTraining, b: FinishedTraining) => {
    if (!a && b) return 1;
    if (a && !b) return -1;
    if (!a && !b) return 0;
    if (a.finishedTimestamp && b.finishedTimestamp) {
      return b.finishedTimestamp - a.finishedTimestamp;
    }
    if (a.finishedTimestamp && !b.finishedTimestamp) return -1;
    if (!a.finishedTimestamp && b.finishedTimestamp) return 1;
    return 0;
  }


  const calculateAverageWatt = (finishedTraining: FinishedTraining) => {
    const chartData: ExtMetric[] | undefined = finishedTraining.trainingChartData;
    if(chartData){
      let sum = 0;
      const instantDataPoints = chartData.filter(e => e.instant !== undefined);
      instantDataPoints.forEach(e => sum += (e.instant ?? 0));
      return (sum / instantDataPoints.length);
    } else {
      return -1;
    }
  }

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
            <TableHead>Average Watt Amount</TableHead>
            <TableHead>Finsihed at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainings.sort(sortFunc).map((training: FinishedTraining) => {
            return (
              <TableRow key={training.id} className="cursor-pointer" onClick={() => setSelectedTraining(training)}>
                <TableCell>{training.title}</TableCell>
                <TableCell>{training.description ?? "-"}</TableCell>
                <TableCell>{training.targetedTrainingTime}</TableCell>
                <TableCell>{training.id == selectedTraining?.id && "Yes"}</TableCell>
                <TableCell>{calculateAverageWatt(training).toFixed(2)}</TableCell>
                <TableCell>{training.finishedTimestamp ? new Date(training.finishedTimestamp).toISOString(): "-"}</TableCell>
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