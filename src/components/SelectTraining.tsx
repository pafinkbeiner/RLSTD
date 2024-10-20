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
import { Metric, Training, TrainingInstanceWahoo } from "@/types/Training";
import InformationCard from "./InformationCard";
import { Zap } from "lucide-react";

interface Props {
  setTraining: React.Dispatch<React.SetStateAction<TrainingInstanceWahoo | undefined>>
}

export function SelectTraining(props: Props) {

  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | undefined>(undefined);

  useEffect(() => {
    setTrainings([]);
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      if (key !== null && key.startsWith("training-")) {
        const training = JSON.parse(localStorage.getItem(key)!);
        setTrainings((prevTrainings: any) => [...prevTrainings, training]);
      }
    }
  }, [])

  const loadTraining = () => {
    if(selectedTraining !== undefined){
      props.setTraining(new TrainingInstanceWahoo(selectedTraining.title, selectedTraining.targetedTrainingTime, selectedTraining.targetPowerZones));
    }
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
        <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap p-5'>
          {trainings.map((training: Training) => {
            return (
              <div onClick={() => setSelectedTraining(training)}>
                <InformationCard icon={<Zap height={20} width={20} />} title={`${training.title} ${training.title === selectedTraining?.title ? " (selected)" : ""}`} value={training.targetPowerZones.length} desc={training.description ?? ""} unit={"target power zones"} />
              </div>
            );
          })}
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