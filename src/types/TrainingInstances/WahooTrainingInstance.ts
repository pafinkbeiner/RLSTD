import { Subject, Subscription } from "rxjs";
import { Metric, TrainingSnapshot } from "../Training";
import { notify_0x2AD2, write_0x2AD9 } from "@/lib/bluetooth";
import { convert_0x2AD2, numToUint8Array, opCodes_0x2AD9 } from "@/lib/convert";
import { TrainingInstance } from "./TrainingInstance";

export class WahooTrainingInstance extends TrainingInstance {

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
        super(title, targetedTrainingTime, targetPowerZones);
        this.instanteneousPower = new Subject();
        this.instanteneousCadence = new Subject();
        this.instanteneousSpeed = new Subject();
        this._instanteneousPowerSubscription = notify_0x2AD2.asObservable().subscribe(v => {
            const value = convert_0x2AD2(v);
            this._currentInstantaneousPower = value.instantaneousPower;
            this._currentInstantaneousCadence = value.instantaneousCadence;
            this._currentInstantaneousSpeed = value.instantaneousSpeed;
        });
        // Register Logging Handler
        // this.registerHandler((trainingSnapshot: TrainingSnapshot) => {
        //     console.log("-----------------------------------")
        //     console.log("Current Training Difference: ", trainingSnapshot.currentTrainingDifference);
        //     console.log("Current Training Timestamp: ", trainingSnapshot.currentTrainingTimestamp);
        // });
        // Register Current Power Handler
        this.registerHandler((trainingSnapshot: TrainingSnapshot) => {
            const nextPowerTarget = this._currentInstantaneousPower * this.instantenousPowerMultiplier;
            this.instanteneousPower.next({ts: trainingSnapshot.currentTrainingDifference, target: nextPowerTarget});
        });
        // Register Target Power Change Handler
        this.registerHandler(async (trainingSnapshot: TrainingSnapshot) => {
            const targetPowerZone = this._targetPowerZones.find((v) => v.ts === trainingSnapshot.currentTrainingDifference);
            if(targetPowerZone){
                if(targetPowerZone.target !== this._currentTargetPower){
                    console.log("Target Power Difference detected! Setting Target Power to: ", targetPowerZone.target);
                    await this.setTargetPower(targetPowerZone.target);
                    this._currentTargetPower = targetPowerZone.target;
                }
            }
        })
    }

    public async start(){
        super.start();
        await this.requestPowerControl();
    }

    private async requestPowerControl() {
        if(!this._powerControlRequested){
            try{
                await write_0x2AD9(new Uint8Array([opCodes_0x2AD9.requestControl]))
            }catch(e){
                console.log("Error requesting power control: ", e);
                console.log("Device probably not connected!");
            }
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