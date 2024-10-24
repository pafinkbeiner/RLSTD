import { BehaviorSubject, interval, takeWhile } from "rxjs";
import { ExtMetric, Metric, Training, TrainingSnapshot, TrainingState } from "../Training";

export abstract class TrainingInstance implements Training {
    readonly id: string;
    title: string;
    description?: string;
    targetedTrainingTime: number;
    targetedTimeInTwoHeartRateZones?: number;
    targetedTimeInThreeHeartRateZones?: number;
    targetedTimeInFiveHeartRateZones?: number;
    trainingChartData?: ExtMetric[] | undefined;
    _targetPowerZones: Metric[];
    cloudSynchronised?: boolean;

    // Time related
    private _timerSubscription: any = undefined;
    private _refreshInterval: number = 250;
    private _startTimeStamp: number = 0;
    private _pausedDuration: number = 0;

    private handler: Array<(trainingSnapshot: TrainingSnapshot) => void> = [];
    public trainingStatus: BehaviorSubject<TrainingState> = new BehaviorSubject<TrainingState>(TrainingState.Stopped);

    constructor(title: string, targetedTrainingTime: number, targetPowerZones: Metric[] = []) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.targetedTrainingTime = targetedTrainingTime;
        this._targetPowerZones = targetPowerZones;
    }

    public get targetPowerZones() {
        if (this._targetPowerZones.length > 0) {
            const firstPowerZone = this._targetPowerZones[0];
            const lastPowerZone = this._targetPowerZones[this._targetPowerZones.length - 1];
            return [{
                ts: 0,
                target: firstPowerZone.target
            },
            ...this._targetPowerZones,
            {
                ts: this.targetedTrainingTime,
                target: lastPowerZone.target
            }];
        } else {
            return this._targetPowerZones;
        }
    }

    public set targetPowerZones(value: Metric[]) {
        this._targetPowerZones = value;
    }

    public registerHandler(handler: (trainingSnapshot: TrainingSnapshot) => void) {
        this.handler.push(handler);
    }

    private tick(currentTime: number) {
        const currentTrainingTimestamp = currentTime - this._startTimeStamp - this._pausedDuration;  // Current timestamp in ms since start minus paused time
        const currentTrainingDifference = Math.round(currentTrainingTimestamp / 1000);  // Convert to seconds
        const targetPowerZone = this.targetPowerZones.find(v => v.ts <= currentTrainingDifference && v.ts + this._refreshInterval / 1000 >= currentTrainingDifference);  // Target zone match

        const trainingSnapshot: TrainingSnapshot = {
            currentTrainingTimestamp,
            currentTrainingDifference,
            targetPowerZone
        };

        this.handler.forEach(h => h(trainingSnapshot));
    }

    private startTimer() {
        this._timerSubscription = interval(this._refreshInterval)
            .pipe(takeWhile(() => this.trainingStatus.value === TrainingState.Running))
            .subscribe(() => this.tick(Date.now()));
    }

    private stopTimer() {
        if (this._timerSubscription) {
            this._timerSubscription.unsubscribe();
            this._timerSubscription = undefined;
        }
    }

    public start() {
        if (this._startTimeStamp === 0) {
            this._startTimeStamp = Date.now();
        }

        this.trainingStatus.next(TrainingState.Running);
        this.startTimer();
    }

    public stop() {
        this.trainingStatus.next(TrainingState.Stopped);
        this.stopTimer();
        this._pausedDuration = 0;
    }

    public pause() {
        this.trainingStatus.next(TrainingState.Paused);
        this.stopTimer();
        this._pausedDuration += Date.now() - this._startTimeStamp;  // Accumulate paused time
    }

    public continue() {
        this.trainingStatus.next(TrainingState.Running);
        this.startTimer();
    }

    public save(){
        if(this.trainingChartData){
            const training: Training = {
                id: this.id,
                title: this.title,
                targetedTrainingTime: this.targetedTrainingTime,
                targetPowerZones: this.targetPowerZones,
                trainingChartData: this.trainingChartData,
            }
            if(this.cloudSynchronised){
                // TODO: Save to cloud
                console.log("Save to cloud ...");
            } else {
                // TODO: Save to localStorage
                console.log("Save to local Storage ...");
                localStorage.setItem(`finished-training-${this.id}`, JSON.stringify(training));
            }
        }
    }
}