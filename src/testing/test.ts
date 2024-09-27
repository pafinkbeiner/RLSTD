import { notify_0x2A63, notify_0x2AD2, notify_0x2AD3, notify_0x2ADA, read_0x2A5D, read_0x2A65, read_0x2ACC, read_0x2AD6, read_0x2AD8 } from "@/lib/bluetooth";
import { convert_0x2A5D, convert_0x2A63, convert_0x2A65, convert_0x2ACC, convert_0x2AD2, convert_0x2AD6, convert_0x2AD8, flags_0x2A65, flags_0x2ACC_FMFF, flags_0x2ACC_TSFF, flags_0x2AD2 } from "@/lib/convert";

const test = async () => {
    notify_0x2A63.asObservable().subscribe(v => {
        const value = convert_0x2A63(v);
    });
    notify_0x2AD3.asObservable().subscribe(v => {
        console.log("TRAINING STATUS: ", v);
    });
    notify_0x2ADA.asObservable().subscribe(v => {
        console.log("FITNESS MACHINE STATUS: ", v);
    });
    notify_0x2AD2.asObservable().subscribe(v => {
        const value = convert_0x2AD2(v);
        console.log("moreData", (value.flags & flags_0x2AD2.moreData) > 0);
        console.log("averageSpeedPresent", (value.flags & flags_0x2AD2.averageSpeedPresent) > 0);
        console.log("instantaneousCadence", (value.flags & flags_0x2AD2.instantaneousCadence) > 0);
        console.log("averageCadencePresent", (value.flags & flags_0x2AD2.averageCadencePresent) > 0);
        console.log("totalDistancePresent", (value.flags & flags_0x2AD2.totalDistancePresent) > 0);
        console.log("resistanceLevelPresent", (value.flags & flags_0x2AD2.resistanceLevelPresent) > 0);
        console.log("instantaneousPowerPresent", (value.flags & flags_0x2AD2.instantaneousPowerPresent) > 0);
        console.log("averagePowerPresent", (value.flags & flags_0x2AD2.averagePowerPresent) > 0);
        console.log("expendedEnergyPresent", (value.flags & flags_0x2AD2.expendedEnergyPresent) > 0);
        console.log("heartRatePresent", (value.flags & flags_0x2AD2.heartRatePresent) > 0);
        console.log("metabolicEquivalentPresent", (value.flags & flags_0x2AD2.metabolicEquivalentPresent) > 0);
        console.log("elapsedTimePresent", (value.flags & flags_0x2AD2.elapsedTimePresent) > 0);
        console.log("remainingTimePresent", (value.flags & flags_0x2AD2.remainingTimePresent) > 0);
        console.log("value.instantaneousCadence", value.instantaneousCadence);  // WICHTIG
        console.log("value.instantaneousPower", value.instantaneousPower);      // WICHTIG
        console.log("value.instantaneousSpeed", value.instantaneousSpeed);      // WICHTIG
    });
    read_0x2A65.refresh().then(v => {
        const value = convert_0x2A65(v);
        console.log("flags_0x2A65.pedalPowerBalance", (flags_0x2A65.pedalPowerBalance & value.flags) > 0);
        console.log("flags_0x2A65.accumulatedTorque", (flags_0x2A65.accumulatedTorque & value.flags) > 0);
        console.log("flags_0x2A65.wheelRevolutionData", (flags_0x2A65.wheelRevolutionData & value.flags) > 0);
        console.log("flags_0x2A65.crankRevolutionData", (flags_0x2A65.crankRevolutionData & value.flags) > 0);
        console.log("flags_0x2A65.extremeMagnitudes", (flags_0x2A65.extremeMagnitudes & value.flags) > 0);
        console.log("flags_0x2A65.extremeAngles", (flags_0x2A65.extremeAngles & value.flags) > 0);
        console.log("flags_0x2A65.topAndBottomDeadSpotAngles", (flags_0x2A65.topAndBottomDeadSpotAngles & value.flags) > 0);
        console.log("flags_0x2A65.accumulatedEnergy", (flags_0x2A65.accumulatedEnergy & value.flags) > 0);
        console.log("flags_0x2A65.offsetCompensationIndicator", (flags_0x2A65.offsetCompensationIndicator & value.flags) > 0);
        console.log("flags_0x2A65.offsetCompensation", (flags_0x2A65.offsetCompensation & value.flags) > 0);
        console.log("flags_0x2A65.cyclingPowerMeasurementCharacteristicContentMasking", (flags_0x2A65.cyclingPowerMeasurementCharacteristicContentMasking & value.flags) > 0);
        console.log("flags_0x2A65.multipleSensorLocations", (flags_0x2A65.multipleSensorLocations & value.flags) > 0);
        console.log("flags_0x2A65.crankLengthAdjustment", (flags_0x2A65.crankLengthAdjustment & value.flags) > 0);
        console.log("flags_0x2A65.chainLengthAdjustment", (flags_0x2A65.chainLengthAdjustment & value.flags) > 0);
        console.log("flags_0x2A65.chainWeightAdjustment", (flags_0x2A65.chainWeightAdjustment & value.flags) > 0);
        console.log("flags_0x2A65.spanLengthAdjustment", (flags_0x2A65.spanLengthAdjustment & value.flags) > 0);
        console.log("flags_0x2A65.sensorMeasurementContext", (flags_0x2A65.sensorMeasurementContext & value.flags) > 0);
        console.log("flags_0x2A65.instantaneousMeasurementDirection", (flags_0x2A65.instantaneousMeasurementDirection & value.flags) > 0);
        console.log("flags_0x2A65.factoryCalibrationDate", (flags_0x2A65.factoryCalibrationDate & value.flags) > 0);
        console.log("flags_0x2A65.enhancedOffsetCompensation", (flags_0x2A65.enhancedOffsetCompensation & value.flags) > 0);
    });
    read_0x2A5D.refresh().then(v => {
        const value = convert_0x2A5D(v);
        console.log("value.sensorLocation", value.sensorLocation);
    });
    read_0x2ACC.refresh().then(v => {
        const value = convert_0x2ACC(v);
        console.log("value.fitnessMachineFeatures", value.fitnessMachineFeatures);
        console.log("value.targetSettingFeatures", value.targetSettingFeatures);

        console.log("averageSpeedSupported", (flags_0x2ACC_FMFF.averageSpeedSupported & value.fitnessMachineFeatures) > 0);
        console.log("cadenceSupported", (flags_0x2ACC_FMFF.cadenceSupported & value.fitnessMachineFeatures) > 0);
        console.log("totalDistanceSupported", (flags_0x2ACC_FMFF.totalDistanceSupported & value.fitnessMachineFeatures) > 0);
        console.log("inclinationSupported", (flags_0x2ACC_FMFF.inclinationSupported & value.fitnessMachineFeatures) > 0);
        console.log("paceSupported", (flags_0x2ACC_FMFF.paceSupported & value.fitnessMachineFeatures) > 0);
        console.log("stepCountSupported", (flags_0x2ACC_FMFF.stepCountSupported & value.fitnessMachineFeatures) > 0);
        console.log("resistanceLevelSupported", (flags_0x2ACC_FMFF.resistanceLevelSupported & value.fitnessMachineFeatures) > 0);
        console.log("strideCountSupported", (flags_0x2ACC_FMFF.strideCountSupported & value.fitnessMachineFeatures) > 0);
        console.log("expendedEnergySupported", (flags_0x2ACC_FMFF.expendedEnergySupported & value.fitnessMachineFeatures) > 0);
        console.log("heartRateMesaurementSupported", (flags_0x2ACC_FMFF.heartRateMesaurementSupported & value.fitnessMachineFeatures) > 0);
        console.log("metabolicEquivalentSupported", (flags_0x2ACC_FMFF.metabolicEquivalentSupported & value.fitnessMachineFeatures) > 0);
        console.log("elapsedTimeSupported", (flags_0x2ACC_FMFF.elapsedTimeSupported & value.fitnessMachineFeatures) > 0);
        console.log("remainingTimeSupported", (flags_0x2ACC_FMFF.remainingTimeSupported & value.fitnessMachineFeatures) > 0);
        console.log("powerMeasurementSupported", (flags_0x2ACC_FMFF.powerMeasurementSupported & value.fitnessMachineFeatures) > 0);
        console.log("forceOnBeltAndPowerOutputSupported", (flags_0x2ACC_FMFF.forceOnBeltAndPowerOutputSupported & value.fitnessMachineFeatures) > 0);
        console.log("userDataRetentionSupported", (flags_0x2ACC_FMFF.userDataRetentionSupported & value.fitnessMachineFeatures) > 0);

        console.log("speedTargetSettingSupported", (flags_0x2ACC_TSFF.speedTargetSettingSupported & value.targetSettingFeatures) > 0);
        console.log("inclinationTargetSettingSupported", (flags_0x2ACC_TSFF.inclinationTargetSettingSupported & value.targetSettingFeatures) > 0);
        console.log("resistanceTargetSettingSupported", (flags_0x2ACC_TSFF.resistanceTargetSettingSupported & value.targetSettingFeatures) > 0);
        console.log("powerTargetSettingSupported", (flags_0x2ACC_TSFF.powerTargetSettingSupported & value.targetSettingFeatures) > 0);
        console.log("heartRateTargetSettingSupported", (flags_0x2ACC_TSFF.heartRateTargetSettingSupported & value.targetSettingFeatures) > 0);
        console.log("targetedExpendedEnergyConfigurationSupported", (flags_0x2ACC_TSFF.targetedExpendedEnergyConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("targetedStepNumberConfigurationSupported", (flags_0x2ACC_TSFF.targetedStepNumberConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("targetedStrideNumberConfigurationSupported", (flags_0x2ACC_TSFF.targetedStrideNumberConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("targetedDistanceConfigurationSupported", (flags_0x2ACC_TSFF.targetedDistanceConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("targetedTrainingTimeConfigurationSupported", (flags_0x2ACC_TSFF.targetedTrainingTimeConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("targetedTimeInTwoHeartRateZonesConfigurationSupported", (flags_0x2ACC_TSFF.targetedTimeInTwoHeartRateZonesConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("targetedTimeInThreeHeartRateZonesConfigurationSupported", (flags_0x2ACC_TSFF.targetedTimeInThreeHeartRateZonesConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("targetedTimeInFiveHeartRateZonesConfigurationSupported", (flags_0x2ACC_TSFF.targetedTimeInFiveHeartRateZonesConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("indoorBikeSimulationParametersSupported", (flags_0x2ACC_TSFF.indoorBikeSimulationParametersSupported & value.targetSettingFeatures) > 0);
        console.log("wheelCircumferenceConfigurationSupported", (flags_0x2ACC_TSFF.wheelCircumferenceConfigurationSupported & value.targetSettingFeatures) > 0);
        console.log("spinDownControlSupported", (flags_0x2ACC_TSFF.spinDownControlSupported & value.targetSettingFeatures) > 0);
        console.log("targetedCadenceConfigurationSupported", (flags_0x2ACC_TSFF.targetedCadenceConfigurationSupported & value.targetSettingFeatures) > 0);
    });
    read_0x2AD6.refresh().then(v => {
        const value = convert_0x2AD6(v);
        console.log("Supported Resistance Level Range", value);
    });
    read_0x2AD8.refresh().then(v => {
        const value = convert_0x2AD8(v);
        console.log("Supported Power Range", value)
    });
}