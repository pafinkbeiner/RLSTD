import { useEffect, useState } from "react";
import { Button } from "./components/ui/button"
import { connect, connected, disconnect, notify_0x2AD2, write_0x2AD9 } from "./lib/bluetooth"
import { convert_0x2AD2, numToUint8Array, opCodes_0x2AD9 } from "./lib/convert"
import ConnectivityIndicator from "./components/ConnectivityIndicator";
import InformationCard from "./components/InformationCard";
import { Gauge, RotateCwIcon, TriangleRight, Zap } from "lucide-react";
import { TrainingChart } from "./components/TrainingChart";
import { Training as TrainingType, TrainingState } from "./types/Training";
import { AddTraining } from "./components/AddTraining/AddTraining";
import { SelectTraining } from "./components/SelectTraining";
import { BehaviorSubject, Subscription } from "rxjs";
import { WahooTrainingInstance } from "./types/TrainingInstances/WahooTrainingInstance";
import { useLocation } from "react-router-dom";
import { SelectRepoTraining } from "./components/SelectRepoTraining";

const Training = () => {

  const location = useLocation()

  const [isConnected, setIsConnected] = useState(false);

  const [instantaneousPower, setInstantaneousPower] = useState<number | undefined>(0);
  const [instantaneousCadence, setInstantaneousCadence] = useState<number | undefined>(0);
  const [instantaneousSpeed, setInstantaneousSpeed] = useState<number | undefined>(0);
  const [instantaneousPowerMultiplier, setInstantaneousPowerMultiplier] = useState(1);

  const [trainingStatus, setTrainingStatus] = useState<TrainingState>(TrainingState.Stopped);
  const [training, setTraining] = useState<WahooTrainingInstance | undefined>(undefined);

  useEffect(() => {
    const training: TrainingType | undefined = location.state?.training;
    if (training !== undefined) {
      setTraining(new WahooTrainingInstance(training.title, training.targetedTrainingTime, training.targetPowerZones))
    }
  }, [location]);

  useEffect(() => {
    const sub_connected = connected.asObservable().subscribe(v => {
      setIsConnected(v);
    });
    const sub_0x2AD2 = notify_0x2AD2.asObservable().subscribe(v => {
      const value = convert_0x2AD2(v);
      setInstantaneousPower(value.instantaneousPower);
      setInstantaneousCadence(value.instantaneousCadence);
      setInstantaneousSpeed(value.instantaneousSpeed);
    });

    return () => {
      sub_connected.unsubscribe();
      sub_0x2AD2.unsubscribe();
    }
  })

  useEffect(() => {
    let subscription: Subscription | undefined = undefined;
    if (training) {
      subscription = training.trainingStatus.subscribe((v: TrainingState) => {
        setTrainingStatus(v);
      })
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }, [training])

  return (
    <>
      <p>Training</p>
      <ConnectivityIndicator onClick={isConnected ? () => disconnect() : async () => await connect()} className="position-absolute top-0 right-0" connected={isConnected} />
      <AddTraining />
      <div className="flex flex-row gap-3">
        <SelectTraining setTraining={setTraining} />
      </div>
      { !training && 
        <SelectRepoTraining setTraining={setTraining}/>
      }
      {training &&
        <>
          <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
            <InformationCard icon={<Zap height={20} width={20} />} title="Instantaneous Power" value={instantaneousPower} desc="Instantaneous Power" unit={"W"} />
            <InformationCard icon={<RotateCwIcon height={20} width={20} />} title="Instantaneous Cadence" value={instantaneousCadence} desc="Instantaneous Cadence" unit={"per min"} />
            <InformationCard icon={<Gauge height={20} width={20} />} title="Instantaneous Speed" value={instantaneousSpeed} desc="Instantaneous Speed" unit={"km/h"} />

            <div className="rounded-xl border bg-card text-card-foreground shadow min-w-64 flex items-center flex-col flex-1">
              <div className="self-start p-6 flex flex-row items-center justify-between space-y-0 pb-5 w-full">
                <h3 className="tracking-tight text-sm font-medium">Power Multiplier</h3>
                <TriangleRight height={20} width={20} />
              </div>
              <div className="flex gap-2 items-center p-6 pt-0">
                <Button onClick={() => {
                  training.instantenousPowerMultiplier = training.instantenousPowerMultiplier - 0.1;
                  setInstantaneousPowerMultiplier(training.instantenousPowerMultiplier);
                }}>-</Button>
                {instantaneousPowerMultiplier.toFixed(1)}
                <Button onClick={() => {
                  training.instantenousPowerMultiplier = training.instantenousPowerMultiplier + 0.1;
                  setInstantaneousPowerMultiplier(training.instantenousPowerMultiplier);
                }}>+</Button>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
            <TrainingChart training={training} />
          </div>
          <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
            <Button disabled={(trainingStatus == TrainingState.Running) || (trainingStatus == TrainingState.Paused)} onClick={async () => await training.start()}>Start Training</Button>
            <Button disabled={(trainingStatus == TrainingState.Running) || (trainingStatus == TrainingState.Stopped)} onClick={async () => training.continue()}>Continue Training</Button>
            <Button disabled={(trainingStatus == TrainingState.Paused) || (trainingStatus == TrainingState.Stopped)} onClick={async () => training.pause()}>Pause Training</Button>
            <Button disabled={(trainingStatus == TrainingState.Stopped)} onClick={async () => {
              training.stop();
              training.save();
              // setTraining(undefined); 
            }}>Stop Training</Button>
          </div>
        </>}
    </>
  )
}

export default Training