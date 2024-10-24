import { Subject } from "rxjs";
import { WahooTrainingInstance } from "./TrainingInstances/WahooTrainingInstance";

export enum TrainingState {
    Stopped,
    Running,
    Paused,
}

export interface Metric {
    ts: number;
    target: number;
}

export interface ExtMetric extends Metric {
    instant?: number;
}

export interface Training {
    id: string;
    title: string;
    description?: string;
    targetedTrainingTime: number;
    targetedTimeInTwoHeartRateZones?: number;
    targetedTimeInThreeHeartRateZones?: number;
    targetedTimeInFiveHeartRateZones?: number;
    targetPowerZones: Metric[];
    trainingChartData?: ExtMetric[];
    instanteneousPower?: Subject<Metric>;
    trainingStatus?: Subject<TrainingState>;
    cloudSynchronised?: boolean;
    // Essentials
    start?: () => void;
    stop?: () => void;
    continue?: () => void;    
    pause?: () => void;
    save?: () => void;
}

export interface TrainingSnapshot {
    currentTrainingTimestamp: number;
    currentTrainingDifference: number;
    targetPowerZone: Metric | undefined;
}

export const exampleTrainingData: any = {
    title: "Example Training",
    description: "Example Training Description",
    targetedTrainingTime: 110,
    targetPowerZones: [
        {
            ts: 20,
            target: 100
        },
        {
            ts: 40,
            target: 200
        },
        {
            ts: 60,
            target: 150
        },
        {
            ts: 70,
            target: 100
        },
        {
            ts: 80,
            target: 200
        },
        {
            ts: 100,
            target: 150
        }
    ]
}

export const exampleTraining = new WahooTrainingInstance(exampleTrainingData.title, exampleTrainingData.targetedTrainingTime, exampleTrainingData.targetPowerZones);