import { Subject } from "rxjs";

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
    targetPowerZones: Metric[];
    cloudSynchronised?: boolean;
    trainingChartData?: any; // TODO - delete
    // Essentials
    start?: () => void;
    stop?: () => void;
    continue?: () => void;    
    pause?: () => void;
    save?: () => void;
}

export interface FinishedTraining extends Training {
    trainingChartData?: ExtMetric[];
    finishedTimestamp: number;
    finishedTrainingScore?: number;
    finsihedPowerMultiplier: number;
}

export interface InstantiatedTraining extends Training {
    instanteneousPower?: Subject<Metric>;
    trainingStatus?: Subject<TrainingState>;
}

export interface TrainingSnapshot {
    currentTrainingTimestamp: number;
    currentTrainingDifference: number;
    targetPowerZone: Metric | undefined;
    lastPowerZone: Metric;
}
