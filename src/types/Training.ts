import { notify_0x2AD2, write_0x2AD9 } from "@/lib/bluetooth";
import { convert_0x2AD2, numToUint8Array, opCodes_0x2AD9 } from "@/lib/convert";
import { BehaviorSubject, first, Subject, Subscription } from "rxjs";

enum TrainingState {
    Stopped,
    Running,
    Paused,
}

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
    instanteneousPower: Subject<Metric>;
    // Essentials
    start: () => void;
    stop: () => void;
    continue: () => void;    
    pause: () => void;
}

export class TrainingInstanceWahoo implements Training {

    public title: string = "";
    public description?: string | undefined = "";
    public targetedTrainingTime: number = 0;
    public targetedTimeInTwoHeartRateZones?: number = 0;
    public targetedTimeInThreeHeartRateZones?: number = 0;
    public targetedTimeInFiveHeartRateZones?: number = 0;
    private _targetPowerZones: Metric[];
    
    // Time related
    private _timer: NodeJS.Timeout | undefined = undefined;
    private _refreshInterval: number = 1000;
    private _startTimeStamp: number = 0;
    
    // Bike related
    private _powerControlRequested: boolean = false;
    private _currentTargetPower: number = 0;
    public instanteneousPower: Subject<Metric>;
    private _instanteneousPowerSubscription: Subscription | undefined = undefined;
    private _currentInstantaneousPower: number = 0;
    public instanteneousCadence: Subject<Metric>;
    private _instanteneousCadenceSubscription: Subscription | undefined = undefined;
    private _currentInstantaneousCadence: number = 0;
    public instanteneousSpeed: Subject<Metric>;
    private _instanteneousSpeedSubscription: Subscription | undefined = undefined;
    private _currentInstantaneousSpeed: number = 0;

    constructor(title: string, targetedTrainingTime: number, targetPowerZones: Metric[] = []) {
        this.title = title;
        this.targetedTrainingTime = targetedTrainingTime;
        this._targetPowerZones = targetPowerZones;
        this.instanteneousPower = new Subject();
        this.instanteneousCadence = new Subject();
        this.instanteneousSpeed = new Subject();
        this._instanteneousPowerSubscription = notify_0x2AD2.asObservable().subscribe(v => {
            const value = convert_0x2AD2(v);
            this._currentInstantaneousPower = value.instantaneousPower;
            this._currentInstantaneousCadence = value.instantaneousCadence;
            this._currentInstantaneousSpeed = value.instantaneousSpeed;
        });
    }

    public get targetPowerZones() {
        if(this._targetPowerZones.length > 0){
            const firstPowerZone = this._targetPowerZones[0];
            const lastPowerZone = this._targetPowerZones[this._targetPowerZones.length - 1];
            return [{
                ts: 0,
                target: firstPowerZone.target
            }, 
            ...this._targetPowerZones, {
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

    public async tick() {
        // Instantaneous Power
        const currentTrainingTimestamp: number = Date.now() - this._startTimeStamp;
        const currentTrainingDifference: number = Math.round(currentTrainingTimestamp / 1000);
        this.instanteneousPower.next({ts: currentTrainingDifference, target: this._currentInstantaneousPower});
        // Target Power
        const targetPowerZone = this._targetPowerZones.find((v) => v.ts === currentTrainingDifference);
        if(targetPowerZone){
            if(targetPowerZone.target !== this._currentTargetPower){
                console.log("Target Power Difference detected! Setting Target Power to: ", targetPowerZone.target);
                await this.setTargetPower(targetPowerZone.target);
                this._currentTargetPower = targetPowerZone.target;
            }
        }
    }

    public async start() {
        await this.requestPowerControl();
        if(this._startTimeStamp === 0){
            this._startTimeStamp = Date.now();
            this._timer = setInterval(async () => await this.tick(), this._refreshInterval);
        }
    }

    public stop() {
        clearInterval(this._timer);
        this._timer = undefined;
        this._instanteneousPowerSubscription?.unsubscribe();
    }

    public continue() {
        if(!this._timer) {
            this._timer = setInterval(async () => await this.tick(), this._refreshInterval);
        }
    }
    public pause() {
        if(this._timer){
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }

    private async requestPowerControl() {
        if(!this._powerControlRequested && false){
            await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.requestControl]))
        }
    }

    private async setTargetPower(targetPower: number) {
        try {
            await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.setTargetPower, ...numToUint8Array(targetPower)]));
        }catch(e){
            console.log("Error setting target power: ", e);
            console.log("Device probably not connected!");
        }
    }
}



const exampleTrainingData: any = {
    title: "Example Training",
    description: "Example Training Description",
    targetedTrainingTime: 110,
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

export const exampleTraining = new TrainingInstanceWahoo(exampleTrainingData.title, exampleTrainingData.targetedTrainingTime, exampleTrainingData.targetPowerZones);