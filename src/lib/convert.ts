import { I0x2A5D } from "@/types/I0x2A5D";
import { I0x2A63 } from "@/types/I0x2A63";
import { I0x2A65 } from "@/types/I0x2A65";
import { I0x2ACC } from "@/types/I0x2ACC";
import { I0x2AD2 } from "@/types/I0x2AD2";
import { I0x2AD6 } from "@/types/I0x2AD6";
import { I0x2AD8 } from "@/types/I0x2AD8";

/**
 * Check Flags f.e.: value.flags & flags_0x2A63.pedalPowerBalancePresent) > 0
 */

//////// Cycling Power Measurement ////////
export const flags_0x2A63 = {
    pedalPowerBalancePresent: 0b0000_0000_0000_0001,
    pedalPowerBalanceReference: 0b0000_0000_0000_0010,
    accumulatedTorquePresent: 0b0000_0000_0000_0100,
    accumulatedTorqueSource: 0b0000_0000_0000_1000,
    wheelRevolutionDataPresent: 0b0000_0000_0001_0000,
    crankRevolutionDataPresent: 0b0000_0000_0010_0000,
    extremeForceMagnitudesPresent: 0b0000_0000_0100_0000,
    extremeTorqueMagnitudesPresent: 0b0000_0000_1000_0000,
    extremeAnglesPresent: 0b0000_0001_0000_0000,
    topDeadSpotAnglePresent: 0b0000_0010_0000_0000,
    bottomDeadSpotAnglePresent: 0b0000_0100_0000_0000,
    accumulatedEnergyPresent: 0b0000_1000_0000_0000,
    offsetCompensationIndicator: 0b0001_0000_0000_0000,
}

export function convert_0x2A63(data: DataView): I0x2A63 {
    return {
        "flags": data.getUint16(0, true),
        "instantaneousPower": data.getUint16(2, true),
        "accumulatedTorque": data.getUint16(4, true),
        "cumulativeCrankRevolutions": data.getUint16(6, true),
        "lastCrankEventTime": data.getUint16(8, true),
        "unknownValues": [
            data.getUint8(10),
            data.getUint8(11),
            data.getUint8(12),
            data.getUint8(13),
            data.getUint8(14),
            data.getUint8(15),
        ]
    }
}

//////// Cycling Power Feature ////////
export const flags_0x2A65 = {
    pedalPowerBalance: 0b0000_0000_0000_0000_0001,
    accumulatedTorque: 0b0000_0000_0000_0000_0010,
    wheelRevolutionData: 0b0000_0000_0000_0000_0100,
    crankRevolutionData: 0b0000_0000_0000_0000_1000,
    extremeMagnitudes: 0b0000_0000_0000_0001_0000,
    extremeAngles: 0b0000_0000_0000_0010_0000,
    topAndBottomDeadSpotAngles: 0b0000_0000_0000_0100_0000,
    accumulatedEnergy: 0b0000_0000_0000_1000_0000,
    offsetCompensationIndicator: 0b0000_0000_0001_0000_0000,
    offsetCompensation: 0b0000_0000_0010_0000_0000,
    cyclingPowerMeasurementCharacteristicContentMasking: 0b0000_0000_0100_0000_0000,
    multipleSensorLocations: 0b0000_0000_1000_0000_0000,
    crankLengthAdjustment: 0b0000_0001_0000_0000_0000,
    chainLengthAdjustment: 0b0000_0010_0000_0000_0000,
    chainWeightAdjustment: 0b0000_0100_0000_0000_0000,
    spanLengthAdjustment: 0b0000_1000_0000_0000_0000,
    sensorMeasurementContext: 0b0001_0000_0000_0000_0000,
    instantaneousMeasurementDirection: 0b0010_0000_0000_0000_0000,
    factoryCalibrationDate: 0b0100_0000_0000_0000_0000,
    enhancedOffsetCompensation: 0b1000_0000_0000_0000_0000,
}

export function convert_0x2A65(data: DataView): I0x2A65 {
    return {
        flags: data.getUint16(0, true)
    }
}

//////// Sensor Location ////////
export function convert_0x2A5D(data: DataView): I0x2A5D {
    return {
        sensorLocation: data.getUint8(0)
    }
}

//////// Fitness Machine Feature ////////
export const flags_0x2ACC_FMFF = {
    averageSpeedSupported: 0b0000_0000_0000_0001,
    cadenceSupported: 0b0000_0000_0000_0010,
    totalDistanceSupported: 0b0000_0000_0000_0100,
    inclinationSupported: 0b0000_0000_0000_1000,
    paceSupported: 0b0000_0000_0001_0000,
    stepCountSupported: 0b0000_0000_0010_0000,
    resistanceLevelSupported: 0b0000_0000_0100_0000,
    strideCountSupported: 0b0000_0000_1000_0000,
    expendedEnergySupported: 0b0000_0001_0000_0000,
    heartRateMesaurementSupported: 0b0000_0010_0000_0000,
    metabolicEquivalentSupported: 0b0000_0100_0000_0000,
    elapsedTimeSupported: 0b0000_1000_0000_0000,
    remainingTimeSupported: 0b0001_0000_0000_0000,
    powerMeasurementSupported: 0b0010_0000_0000_0000,
    forceOnBeltAndPowerOutputSupported: 0b0100_0000_0000_0000,
    userDataRetentionSupported: 0b1000_0000_0000_0000,
}

export const flags_0x2ACC_TSFF = {
    speedTargetSettingSupported: 0b0000_0000_0000_0000_0001,
    inclinationTargetSettingSupported: 0b0000_0000_0000_0000_0010,
    resistanceTargetSettingSupported: 0b0000_0000_0000_0000_0100,
    powerTargetSettingSupported: 0b0000_0000_0000_0000_1000,
    heartRateTargetSettingSupported: 0b0000_0000_0000_0001_0000,
    targetedExpendedEnergyConfigurationSupported: 0b0000_0000_0000_0010_0000,
    targetedStepNumberConfigurationSupported: 0b0000_0000_0000_0100_0000,
    targetedStrideNumberConfigurationSupported: 0b0000_0000_0000_1000_0000,
    targetedDistanceConfigurationSupported: 0b0000_0000_0001_0000_0000,
    targetedTrainingTimeConfigurationSupported: 0b0000_0000_0010_0000_0000,
    targetedTimeInTwoHeartRateZonesConfigurationSupported: 0b0000_0000_0100_0000_0000,
    targetedTimeInThreeHeartRateZonesConfigurationSupported: 0b0000_0000_1000_0000_0000,
    targetedTimeInFiveHeartRateZonesConfigurationSupported: 0b0000_0001_0000_0000_0000,
    indoorBikeSimulationParametersSupported: 0b0000_0010_0000_0000_0000,
    wheelCircumferenceConfigurationSupported: 0b0000_0100_0000_0000_0000,
    spinDownControlSupported: 0b0000_1000_0000_0000_0000,
    targetedCadenceConfigurationSupported: 0b0001_0000_0000_0000_0000,
}

export function convert_0x2ACC(data: DataView): I0x2ACC {
    return {
        fitnessMachineFeatures: data.getInt32(0, true),
        targetSettingFeatures: data.getInt32(4, true)
    }
}

//////// Supported Resistance Level Range ////////
export function convert_0x2AD6(data: DataView): I0x2AD6 {
    return {
        minimumResistanceLevel: data.getUint16(0, true) / 10,
        maximumResistanceLevel: data.getUint16(2, true) / 10,
        minimumIncrement: data.getUint16(4, true) / 10
    }
}

//////// Supported Power Range ////////
export function convert_0x2AD8(data: DataView): I0x2AD8 {
    return {
        minimumPower: data.getUint16(0, true),
        maximumPower: data.getUint16(2, true),
        minimumIncrement: data.getUint16(4, true)
    }
}

//////// Indoor Bike Data ////////
export const flags_0x2AD2: any = {
    moreData: 0b0000_0000_0000_0001,
    averageSpeedPresent: 0b0000_0000_0000_0010,
    instantaneousCadence: 0b0000_0000_0000_0100,
    averageCadencePresent: 0b0000_0000_0000_1000,
    totalDistancePresent: 0b0000_0000_0001_0000,
    resistanceLevelPresent: 0b0000_0000_0010_0000,
    instantaneousPowerPresent: 0b0000_0000_0100_0000,
    averagePowerPresent: 0b0000_0000_1000_0000,
    expendedEnergyPresent: 0b0000_0001_0000_0000,
    heartRatePresent: 0b0000_0010_0000_0000,
    metabolicEquivalentPresent: 0b0000_0100_0000_0000,
    elapsedTimePresent: 0b0000_1000_0000_0000,
    remainingTimePresent: 0b0001_0000_0000_0000,
}


export function convert_0x2AD2(data: DataView): I0x2AD2 {
    return {
        flags: data.getUint16(0, true),
        instantaneousSpeed: data.getUint16(2, true) / 100,
        instantaneousCadence: data.getUint16(4, true),
        instantaneousPower: data.getUint16(6, true)
    }
}

// Fitness Machine Control Point
export const opCodes_0x2AD9 = {
    requestControl: 0x00,
    reset: 0x01,
    setTargetSpeed: 0x02,
    setTargetInclination: 0x03,
    setTargetResistance: 0x04,
    setTargetPower: 0x05,
    setTargetHeartRate: 0x06,
    startOrResume: 0x07,
    stopOrPause: 0x08,
    setTargetedExpendedEnergy: 0x09,
    setTargetedStepNumber: 0x0A,
    setTargetedStrideNumber: 0x0B,
    setTargetedDistance: 0x0C,
    setTargetedTrainingTime: 0x0D,
    setTargetedTimeInTwoHeartRateZones: 0x0E,
    setTargetedTimeInThreeHeartRateZones: 0x0F,
    setTargetedTimeInFiveHeartRateZones: 0x10,
    setIndoorBikeSimulationParameters: 0x11,
    setWheelCircumference: 0x12,
    setSpinDownControl: 0x13,
    setTargetedCadence: 0x14,
    responseCode: 0x80,
}
export type codes_0x2AD9 = keyof typeof opCodes_0x2AD9;

export function numToUint8Array(num: number): Uint8Array {
    let arr = new Uint8Array(8);

    for (let i = 0; i < 8; i++) {
        arr[i] = num % 256;
        num = Math.floor(num / 256);
    }

    return arr;
}