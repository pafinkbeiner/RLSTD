export interface I0x2A63 {
    "flags": number,
    "instantaneousPower"?: number;
    "pedalPowerBalance"?: number;
    "accumulatedTorque"?: number;
    "wheelRevolution"?: number;
    "cumulativeCrankRevolutions"?: number;
    "lastCrankEventTime"?: number;
    "extremeForceMagnitudes"?: number;
    "extremeTorqueMagnitudes"?: number;
    "extremeAngles"?: number;
    "topDeadSpotAngle"?: number;
    "bootomDeadSpotAngle"?: number;
    "accumulatedEnergy"?: number;
    "cyclingPowerMeasurementBrodcastFeature"?: number;
    "unknownValues"?: Array<number>;
}