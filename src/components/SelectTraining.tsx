import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { Metric, Training } from "@/types/Training";
import InformationCard from "./InformationCard";
import { Trash, Trash2, Zap } from "lucide-react";
import { WahooTrainingInstance } from "@/types/TrainingInstances/WahooTrainingInstance";

interface Props {
  setTraining: React.Dispatch<React.SetStateAction<WahooTrainingInstance | undefined>>
}

export function SelectTraining(props: Props) {

  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | undefined>(undefined);

  const refreshState = () => {
    setTrainings([]);
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      if (key !== null && key.startsWith("training-")) {
        const training = JSON.parse(localStorage.getItem(key)!);
        setTrainings((prevTrainings: any) => [...prevTrainings, training]);
      }
    }
  }

  useEffect(() => {
    refreshState();
  }, [])

  const loadTraining = () => {
    if(selectedTraining !== undefined){
      props.setTraining(new WahooTrainingInstance(selectedTraining.title, selectedTraining.targetedTrainingTime, selectedTraining.targetPowerZones));
    }
  }

  const deleteTraining = (id: string) => {
    console.log(id)
    if(localStorage.getItem(`training-${id}`) !== null){
      console.log("Found: " +localStorage.getItem(`training-${id}`) )
      localStorage.removeItem(`training-${id}`);
    }
    refreshState();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Select Saved Training</Button>
      </SheetTrigger>
      <SheetContent className="bg-background text-primary" side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Add new custom Training</SheetTitle>
          <SheetDescription>
            Make Changes to the Training by adding or removing data points.
          </SheetDescription>
        </SheetHeader>
        <Button className="mt-3" variant={"outline"} onClick={() => refreshState()}>Refresh Trainings</Button>
        <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap p-5'>
          {trainings.length > 0 && trainings.map((training: Training) => {
            return (
              <div key={training.id} onClick={() => setSelectedTraining(training)}>
                <InformationCard icon={<Trash onClick={() => deleteTraining(training.id)} height={20} width={20} />} title={`${training.title} ${training.title === selectedTraining?.title ? " (selected)" : ""}`} value={training.targetPowerZones.length} desc={training.description ?? ""} unit={"target power zones"} />
              </div>
            );
          })}
          {trainings.length <= 0 && <h3>No Trainings found</h3>}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"}>Close</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit" onClick={loadTraining}>Load Selected Training</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}