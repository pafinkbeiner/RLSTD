import { I0x2A5D } from "@/types/I0x2A5D";
import { I0x2A63 } from "@/types/I0x2A63";
import { I0x2A65 } from "@/types/I0x2A65";
import { I0x2ACC } from "@/types/I0x2ACC";

/**
 * Check Flags f.e.: value.flags & flags_0x2A63.pedalPowerBalancePresent) > 0
 */

//////// Cycling Power Measurement ////////
export const flags_0x2A63 = {
    pedalPowerBalancePresent:           0b0000_0000_0000_0001,
    pedalPowerBalanceReference:         0b0000_0000_0000_0010,
    accumulatedTorquePresent:           0b0000_0000_0000_0100,
    accumulatedTorqueSource:            0b0000_0000_0000_1000,
    wheelRevolutionDataPresent:         0b0000_0000_0001_0000,
    crankRevolutionDataPresent:         0b0000_0000_0010_0000,
    extremeForceMagnitudesPresent:      0b0000_0000_0100_0000,
    extremeTorqueMagnitudesPresent:     0b0000_0000_1000_0000,
    extremeAnglesPresent:               0b0000_0001_0000_0000,
    topDeadSpotAnglePresent:            0b0000_0010_0000_0000,
    bottomDeadSpotAnglePresent:         0b0000_0100_0000_0000,
    accumulatedEnergyPresent:           0b0000_1000_0000_0000,
    offsetCompensationIndicator:        0b0001_0000_0000_0000,
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
    pedalPowerBalance:                                      0b0000_0000_0000_0000_0001,
    accumulatedTorque:                                      0b0000_0000_0000_0000_0010,
    wheelRevolutionData:                                    0b0000_0000_0000_0000_0100,
    crankRevolutionData:                                    0b0000_0000_0000_0000_1000,
    extremeMagnitudes:                                      0b0000_0000_0000_0001_0000,
    extremeAngles:                                          0b0000_0000_0000_0010_0000,
    topAndBottomDeadSpotAngles:                             0b0000_0000_0000_0100_0000,
    accumulatedEnergy:                                      0b0000_0000_0000_1000_0000,
    offsetCompensationIndicator:                            0b0000_0000_0001_0000_0000,
    offsetCompensation:                                     0b0000_0000_0010_0000_0000,
    cyclingPowerMeasurementCharacteristicContentMasking:    0b0000_0000_0100_0000_0000,
    multipleSensorLocations:                                0b0000_0000_1000_0000_0000,
    crankLengthAdjustment:                                  0b0000_0001_0000_0000_0000,
    chainLengthAdjustment:                                  0b0000_0010_0000_0000_0000,
    chainWeightAdjustment:                                  0b0000_0100_0000_0000_0000,
    spanLengthAdjustment:                                   0b0000_1000_0000_0000_0000,
    sensorMeasurementContext:                               0b0001_0000_0000_0000_0000,
    instantaneousMeasurementDirection:                      0b0010_0000_0000_0000_0000,
    factoryCalibrationDate:                                 0b0100_0000_0000_0000_0000,
    enhancedOffsetCompensation:                             0b1000_0000_0000_0000_0000,
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

//////// Fitness Machine Feature //////// TODO - Not the right flags here!!!
export const flags_0x2ACC_FMFF = {
    averageSpeedSupported:          0b0000_0000_0000_0001,
    cadenceSupported:               0b0000_0000_0000_0010,
    totalDistanceSupported:         0b0000_0000_0000_0100,
    inclinationSupported:           0b0000_0000_0000_1000,
    elevationGainSupported:         0b0000_0000_0001_0000,
    stepCountSupported:             0b0000_0000_0010_0000,
    strokeCountSupported:           0b0000_0000_0100_0000,
    heartRateMeasurementSupported:  0b0000_0000_1000_0000,
    resistanceLevelSupported:       0b0000_0001_0000_0000,
    strideCountSupported:           0b0000_0010_0000_0000,
    powerMeasurementSupported:      0b0000_0100_0000_0000,
    timeElapsedSupported:           0b0000_1000_0000_0000,
    timeRemainingSupported:         0b0001_0000_0000_0000,
}

export const flags_0x2ACC_TSFF = {}

export function convert_0x2ACC(data: DataView): I0x2ACC {
    return {
        fitnessMachineFeatures: data.getInt32(0, false),
        targetSettingFeatures: data.getInt32(4, false)
    }
}
