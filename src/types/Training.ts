import { notify_0x2AD2 } from "@/lib/bluetooth";
import { convert_0x2AD2 } from "@/lib/convert";
import { BehaviorSubject, Subject, Subscription } from "rxjs";

interface Metric {
    ts: number;
    target: number;
}

export interface Training {
    title: string;
    description?: string;
    targetedTrainingTime: number;
    targetedTimeInTwoHeartRateZones?: number;
    targetedTimeInThreeHeartRateZones?: number;
    targetedTimeInFiveHeartRateZones?: number;
    targetPowerZones: Metric[];
    instanteneousPowerZones: Subject<Metric>;
    start: () => void;
    stop: () => void;
    continue: () => void;    
    pause: () => void;
}

export class TrainingInstance implements Training {
    public title: string = "";
    public description?: string | undefined = "";
    public targetedTrainingTime: number = 0;
    public targetedTimeInTwoHeartRateZones?: number = 0;
    public targetedTimeInThreeHeartRateZones?: number = 0;
    public targetedTimeInFiveHeartRateZones?: number = 0;
    public instanteneousPowerZones: Subject<Metric>;
    private _targetPowerZones: Metric[];
    private _timer: NodeJS.Timeout | undefined = undefined;
    private _refreshInterval: number = 1000;
    private _currentTrainingTime: number = 0;
    private _sub_0x2AD2: Subscription | undefined = undefined;
    private _currentInstantaneousPower: number = 0;
    
    constructor(title: string, targetedTrainingTime: number, targetPowerZones: Metric[] = []) {
        this.title = title;
        this.targetedTrainingTime = targetedTrainingTime;
        this._targetPowerZones = targetPowerZones;
        this.instanteneousPowerZones = new Subject();
        this._sub_0x2AD2 = notify_0x2AD2.asObservable().subscribe(v => {
            const value = convert_0x2AD2(v);
            this._currentInstantaneousPower = value.instantaneousPower;
            // const instantaneousCadence = value.instantaneousCadence;
            // const instantaneousSpeed = value.instantaneousSpeed;
          });
    }

    public get targetPowerZones() {
        if(this._targetPowerZones.length > 0){
            const lastPowerZone = this._targetPowerZones[this._targetPowerZones.length - 1];
            return [...this._targetPowerZones, {
                ts: this.targetedTrainingTime,
                target: lastPowerZone.target
            }];
        }else{
            return this._targetPowerZones;
        }
    }

    public set targetPowerZones(value: Metric[]) {
        this._targetPowerZones = value;
    }

    public start() {
        this._timer = setInterval(() => {
            console.log("Timer Interval")
            this._currentTrainingTime += this._refreshInterval / 1000;
            this.instanteneousPowerZones.next({ts: this._currentTrainingTime, target: this._currentInstantaneousPower});
            console.log(this._currentTrainingTime)
            console.log({ts: this._currentTrainingTime, target: this._currentInstantaneousPower})
        }, this._refreshInterval);
    }

    public stop() {
        console.log("Stopping Training!");
        clearInterval(this._timer);
        this._sub_0x2AD2?.unsubscribe();
    }

    public continue() {}
    public pause() {}
}



const exampleTrainingData: any = {
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

export const exampleTraining = new TrainingInstance(exampleTrainingData.title, exampleTrainingData.targetedTrainingTime, exampleTrainingData.targetPowerZones);