import { BehaviorSubject } from "rxjs";
import { Metric, Training, TrainingSnapshot, TrainingState } from "../Training";

export abstract class TrainingInstance implements Training {
    id: string;
    title: string;
    description?: string | undefined;
    targetedTrainingTime: number;
    targetedTimeInTwoHeartRateZones?: number | undefined;
    targetedTimeInThreeHeartRateZones?: number | undefined;
    targetedTimeInFiveHeartRateZones?: number | undefined;
    _targetPowerZones: Metric[];
    cloudSynchronised?: boolean | undefined;
    
    // Time related
    private _timer: NodeJS.Timeout | undefined = undefined;
    private _refreshInterval: number = 250;
    private _startTimeStamp: number = 0;
    
    private handler: Array<(trainingSnapshot: TrainingSnapshot) => void> = [];
    public trainingStatus: BehaviorSubject<TrainingState> = new BehaviorSubject<TrainingState>(TrainingState.Stopped);

    constructor(title: string, targetedTrainingTime: number, targetPowerZones: Metric[] = []) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.targetedTrainingTime = targetedTrainingTime;
        this._targetPowerZones = targetPowerZones;
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

    public registerHandler(handler: (trainingSnapshot: TrainingSnapshot) => void){
        this.handler.push(handler);
    }

    private tick(){
        const currentTrainingTimestamp: number = Date.now() - this._startTimeStamp;
        const currentTrainingDifference: number = Math.round(currentTrainingTimestamp / 1000);
        const targetPowerZone = this.targetPowerZones.find((v) => v.ts === currentTrainingDifference);

        const trainingSnapshot: TrainingSnapshot = {
            currentTrainingTimestamp,
            currentTrainingDifference,
            targetPowerZone
        }

        this.handler.forEach((v) => v(trainingSnapshot));
    }

    public start(){
        this.trainingStatus.next(TrainingState.Running);
        if(this._startTimeStamp === 0){
            this._startTimeStamp = Date.now();
            this._timer = setInterval(() => this.tick(), this._refreshInterval);
        }
    }

    public stop(){
        this.trainingStatus.next(TrainingState.Stopped);
        clearInterval(this._timer);
        this._timer = undefined;
    }

    public continue(){
        this.trainingStatus.next(TrainingState.Running);
        if(!this._timer) {
            this._timer = setInterval(() => this.tick(), this._refreshInterval);
        }
    }

    public pause(){
        this.trainingStatus.next(TrainingState.Paused);
        if(this._timer){
            clearInterval(this._timer);
            this._timer = undefined;
        }
        this._startTimeStamp = Date.now();
    }
}
