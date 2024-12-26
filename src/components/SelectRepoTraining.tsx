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
import { ReporitoryManager } from "@/lib/RepositoryManager";

interface Props {
  setTraining: React.Dispatch<React.SetStateAction<WahooTrainingInstance | undefined>>
}

export function SelectRepoTraining(props: Props) {

  const repositoryManager: ReporitoryManager = new ReporitoryManager();

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | undefined>(undefined);

  const refreshState = async () => {
    const trainings: Training[] = await repositoryManager.getTrainings();
    setTrainings(trainings);
  }

  useEffect(() => {
    refreshState();
  }, [])

  const loadTraining = () => {
    if (selectedTraining !== undefined) {
      props.setTraining(new WahooTrainingInstance(selectedTraining.title, selectedTraining.targetedTrainingTime, selectedTraining.targetPowerZones));
    }
  }

  return (
    <>
      <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap p-5'>
        {trainings.length > 0 && trainings.map((training: Training) => {
          return (
            <div key={training.id} onClick={() => setSelectedTraining(training)}>
              <InformationCard icon={<Trash height={20} width={20} />} title={`${training.title} ${training.title === selectedTraining?.title ? " (selected)" : ""}`} value={training.targetPowerZones.length} desc={training.description ?? ""} unit={"target power zones"} />
            </div>
          );
        })}
        {trainings.length <= 0 && <h3>No Trainings found</h3>}
      </div>

      <Button onClick={refreshState}>Refresh Cloud Trainings</Button>
      <Button type="submit" onClick={loadTraining}>Load Selected Training</Button>
    </>
  )
}