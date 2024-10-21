import { useEffect, useState } from "react";
import { Button } from "./components/ui/button"
import { connect, connected, disconnect, notify_0x2AD2, write_0x2AD9 } from "./lib/bluetooth"
import { convert_0x2AD2, numToUint8Array, opCodes_0x2AD9 } from "./lib/convert"
import ConnectivityIndicator from "./components/ConnectivityIndicator";
import InformationCard from "./components/InformationCard";
import { Gauge, RotateCwIcon, Zap } from "lucide-react";
import { TrainingChart } from "./components/TrainingChart";
import { exampleTraining, exampleTrainingData, TrainingInstanceWahoo, TrainingState } from "./types/Training";
import { AddTraining } from "./components/AddTraining";
import { SelectTraining } from "./components/SelectTraining";
import { Subscription } from "rxjs";

const Training = () => {

  const [isConnected, setIsConnected] = useState(false);

  const [instantaneousPower, setInstantaneousPower] = useState<number | undefined>(0);
  const [instantaneousCadence, setInstantaneousCadence] = useState<number | undefined>(0);
  const [instantaneousSpeed, setInstantaneousSpeed] = useState<number | undefined>(0);

  const [trainingStatus, setTrainingStatus] = useState<TrainingState>(TrainingState.Stopped);
  const [training, setTraining] = useState<TrainingInstanceWahoo | undefined>(undefined);

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
    let subscription: Subscription  | undefined = undefined;
    if(training){
      subscription = training.trainingStatus.subscribe(v => {
        setTrainingStatus(v);
      })
    }
    return () => {
      if(subscription){
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
        <Button onClick={() => setTraining(new TrainingInstanceWahoo(exampleTrainingData.title, exampleTrainingData.targetedTrainingTime, exampleTrainingData.targetPowerZones))}>Load Example Training</Button>
        <SelectTraining setTraining={setTraining}/>
      </div>
      {training &&
        <>
          <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
            <InformationCard icon={<Zap height={20} width={20} />} title="Instantaneous Power" value={instantaneousPower} desc="Instantaneous Power" unit={"W"} />
            <InformationCard icon={<RotateCwIcon height={20} width={20} />} title="Instantaneous Cadence" value={instantaneousCadence} desc="Instantaneous Cadence" unit={"per min"} />
            <InformationCard icon={<Gauge height={20} width={20} />} title="Instantaneous Speed" value={instantaneousSpeed} desc="Instantaneous Speed" unit={"km/h"} />
          </div>
          <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
            <TrainingChart training={training} />
          </div>
          <div className='flex flex-row items-center justify-center gap-5 w-full flex-wrap'>
            <Button disabled={(trainingStatus == TrainingState.Running) || (trainingStatus == TrainingState.Paused)} onClick={async () => await training.start()}>Start Training</Button>
            <Button disabled={(trainingStatus == TrainingState.Running) || (trainingStatus == TrainingState.Stopped)} onClick={async () => training.continue()}>Continue Training</Button>
            <Button disabled={(trainingStatus == TrainingState.Paused) || (trainingStatus == TrainingState.Stopped)} onClick={async () => training.pause()}>Pause Training</Button>
            <Button disabled={(trainingStatus == TrainingState.Stopped)} onClick={async () => { training.stop(); setTraining(undefined); }}>Stop Training</Button>
          </div>
        </>}
    </>
  )
}

export default Training