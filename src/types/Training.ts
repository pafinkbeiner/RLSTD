import { Subject } from "rxjs";

interface Metric {
    ts: number;
    target: number;
}

export interface Training {
    title: string;
    description?: string;
    targetedTrainingTime: number;
    targetedTimeInTwoHeartRateZones: number;
    targetedTimeInThreeHeartRateZones: number;
    targetedTimeInFiveHeartRateZones: number;
    targetPowerZones: Metric[];
    instanteneousPowerZones: Subject<Metric[]>;

}

export const exampleTraining: Training = {
    title: "Example Training",
    description: "Example Training Description",
    targetedTrainingTime: 80,
    targetedTimeInTwoHeartRateZones: 0,
    targetedTimeInThreeHeartRateZones: 0,
    targetedTimeInFiveHeartRateZones: 0,
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
        }
    ],
    instanteneousPowerZones: new Subject()
}