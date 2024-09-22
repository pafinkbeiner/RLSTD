import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { connect, disconnect, status, connected, notify_0x2A63, notify_0x2AD3, notify_0x2ADA, notify_0x2AD2, read_0x2A65, read_0x2A5D, read_0x2ACC, read_0x2AD6, read_0x2AD8 } from './lib/bluetooth'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import InformationCard from './components/InformationCard'
import ConnectedState from './components/ConnectedState'
import { convert_0x2A5D, convert_0x2A63, convert_0x2A65, convert_0x2ACC, flags_0x2A63, flags_0x2A65, flags_0x2ACC_FMFF, flags_0x2ACC_TSFF } from './lib/convert'

let subscibed = false;

function App() {

  const [statusText, setStatusText] = useState("Status: Not connected");
  const [isConnected, setIsConnected] = useState<boolean>(connected.getValue());

  const [cpmValue0, setcpmValue0] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue0", value: 0, desc: "flags"});
  const [cpmValue1, setcpmValue1] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue1", value: 0, desc: "instantaneousPower"});
  const [cpmValue2, setcpmValue2] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue2", value: 0, desc: "accumulatedTorque"});
  const [cpmValue3, setcpmValue3] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue3", value: 0, desc: "cumulativeCrankRevolutions"});
  const [cpmValue4, setcpmValue4] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue4", value: 0, desc: "lastCrankEventTime"});

  const [cpmValue5, setcpmValue5] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue5", value: 0, desc: "noch unbekannt"});
  const [cpmValue6, setcpmValue6] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue6", value: 0, desc: "noch unbekannt"});
  const [cpmValue7, setcpmValue7] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue7", value: 0, desc: "noch unbekannt"});
  const [cpmValue8, setcpmValue8] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue8", value: 0, desc: "noch unbekannt"});
  const [cpmValue9, setcpmValue9] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue9", value: 0, desc: "noch unbekannt"});
  const [cpmValue10, setcpmValue10] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue10", value: 0, desc: "noch unbekannt"});
  const [cpmValue11, setcpmValue11] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue11", value: 0, desc: "noch unbekannt"});
  const [cpmValue12, setcpmValue12] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue12", value: 0, desc: "noch unbekannt"});
  const [cpmValue13, setcpmValue13] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue13", value: 0, desc: "noch unbekannt"});
  const [cpmValue14, setcpmValue14] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue14", value: 0, desc: "noch unbekannt"});
  const [cpmValue15, setcpmValue15] = useState<{title: string, value: number | undefined, desc: string}>({title: "cpmValue15", value: 0, desc: "noch unbekannt"});

  const test = async () => {
    if(!subscibed){
      notify_0x2A63.asObservable().subscribe(v => {
        const value = convert_0x2A63(v);
        setcpmValue0({...cpmValue0, value: value.flags});
        setcpmValue1({...cpmValue1, value: value.instantaneousPower});
        setcpmValue2({...cpmValue2, value: value.accumulatedTorque});
        setcpmValue3({...cpmValue3, value: value.cumulativeCrankRevolutions});
        setcpmValue4({...cpmValue4, value: value.lastCrankEventTime});
      });
      // notify_0x2AD3.asObservable().subscribe(v => console.log(v));
      // notify_0x2ADA.asObservable().subscribe(v => console.log(v));
      // notify_0x2AD2.asObservable().subscribe(v => console.log(v));
    }
    subscibed = true;
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

      console.log("averageSpeedSupported", (flags_0x2ACC_FMFF.averageSpeedSupported & value.fitnessMachineFeatures ) > 0);
      console.log("cadenceSupported", (flags_0x2ACC_FMFF.cadenceSupported & value.fitnessMachineFeatures ) > 0);
      console.log("totalDistanceSupported", (flags_0x2ACC_FMFF.totalDistanceSupported & value.fitnessMachineFeatures ) > 0);
      console.log("inclinationSupported", (flags_0x2ACC_FMFF.inclinationSupported & value.fitnessMachineFeatures ) > 0);
      console.log("paceSupported", (flags_0x2ACC_FMFF.paceSupported & value.fitnessMachineFeatures ) > 0);
      console.log("stepCountSupported", (flags_0x2ACC_FMFF.stepCountSupported & value.fitnessMachineFeatures ) > 0);
      console.log("resistanceLevelSupported", (flags_0x2ACC_FMFF.resistanceLevelSupported & value.fitnessMachineFeatures ) > 0);
      console.log("strideCountSupported", (flags_0x2ACC_FMFF.strideCountSupported & value.fitnessMachineFeatures ) > 0);
      console.log("expendedEnergySupported", (flags_0x2ACC_FMFF.expendedEnergySupported & value.fitnessMachineFeatures ) > 0);
      console.log("heartRateMesaurementSupported", (flags_0x2ACC_FMFF.heartRateMesaurementSupported & value.fitnessMachineFeatures ) > 0);
      console.log("metabolicEquivalentSupported", (flags_0x2ACC_FMFF.metabolicEquivalentSupported & value.fitnessMachineFeatures ) > 0);
      console.log("elapsedTimeSupported", (flags_0x2ACC_FMFF.elapsedTimeSupported & value.fitnessMachineFeatures ) > 0);
      console.log("remainingTimeSupported", (flags_0x2ACC_FMFF.remainingTimeSupported & value.fitnessMachineFeatures ) > 0);
      console.log("powerMeasurementSupported", (flags_0x2ACC_FMFF.powerMeasurementSupported & value.fitnessMachineFeatures ) > 0);
      console.log("forceOnBeltAndPowerOutputSupported", (flags_0x2ACC_FMFF.forceOnBeltAndPowerOutputSupported & value.fitnessMachineFeatures ) > 0);
      console.log("userDataRetentionSupported", (flags_0x2ACC_FMFF.userDataRetentionSupported & value.fitnessMachineFeatures ) > 0);

      console.log("speedTargetSettingSupported", ( flags_0x2ACC_TSFF.speedTargetSettingSupported & value.targetSettingFeatures ) > 0);
      console.log("inclinationTargetSettingSupported", ( flags_0x2ACC_TSFF.inclinationTargetSettingSupported & value.targetSettingFeatures ) > 0);
      console.log("resistanceTargetSettingSupported", ( flags_0x2ACC_TSFF.resistanceTargetSettingSupported & value.targetSettingFeatures ) > 0);
      console.log("powerTargetSettingSupported", ( flags_0x2ACC_TSFF.powerTargetSettingSupported & value.targetSettingFeatures ) > 0);
      console.log("heartRateTargetSettingSupported", ( flags_0x2ACC_TSFF.heartRateTargetSettingSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedExpendedEnergyConfigurationSupported", ( flags_0x2ACC_TSFF.targetedExpendedEnergyConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedStepNumberConfigurationSupported", ( flags_0x2ACC_TSFF.targetedStepNumberConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedStrideNumberConfigurationSupported", ( flags_0x2ACC_TSFF.targetedStrideNumberConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedDistanceConfigurationSupported", ( flags_0x2ACC_TSFF.targetedDistanceConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedTrainingTimeConfigurationSupported", ( flags_0x2ACC_TSFF.targetedTrainingTimeConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedTimeInTwoHeartRateZonesConfigurationSupported", ( flags_0x2ACC_TSFF.targetedTimeInTwoHeartRateZonesConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedTimeInThreeHeartRateZonesConfigurationSupported", ( flags_0x2ACC_TSFF.targetedTimeInThreeHeartRateZonesConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedTimeInFiveHeartRateZonesConfigurationSupported", ( flags_0x2ACC_TSFF.targetedTimeInFiveHeartRateZonesConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("indoorBikeSimulationParametersSupported", ( flags_0x2ACC_TSFF.indoorBikeSimulationParametersSupported & value.targetSettingFeatures ) > 0);
      console.log("wheelCircumferenceConfigurationSupported", ( flags_0x2ACC_TSFF.wheelCircumferenceConfigurationSupported & value.targetSettingFeatures ) > 0);
      console.log("spinDownControlSupported", ( flags_0x2ACC_TSFF.spinDownControlSupported & value.targetSettingFeatures ) > 0);
      console.log("targetedCadenceConfigurationSupported", ( flags_0x2ACC_TSFF.targetedCadenceConfigurationSupported & value.targetSettingFeatures ) > 0);
    });
    // read_0x2AD6.refresh().then(v => console.log(v));
    // read_0x2AD8.refresh().then(v => console.log(v));
  }

  useEffect(() => {
    status.asObservable().subscribe(s => setStatusText(s));
    connected.asObservable().subscribe(c => setIsConnected(c));
  }, [])


  return (
    <div className='flex flex-col items-center'>
      <h1 className="mb-5 mt-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Wahoo Kickr Core Bluetooth Connection
      </h1>
      <ConnectedState isConnected={isConnected}/>
      <div className='mb-5 mt-5 flex gap-1 justify-center'>
        <Button onClick={connect}>Connect to Wahoo Kickr Core</Button>
        <Button onClick={disconnect}>Disconnect Bluetooth Device</Button>
      </div>
      <div className='mb-5' style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem"}}>
      <h2 className='scroll-m-20 font-extrabold tracking-tight lg:text-3xl'>Cycling Power Measurement</h2>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem"}}>
          <InformationCard key={cpmValue0.title} title={cpmValue0.title} value={cpmValue0.value} desc={cpmValue0.desc}/>
          <InformationCard key={cpmValue1.title} title={cpmValue1.title} value={cpmValue1.value} desc={cpmValue1.desc}/>
          <InformationCard key={cpmValue2.title} title={cpmValue2.title} value={cpmValue2.value} desc={cpmValue2.desc}/>
          <InformationCard key={cpmValue3.title} title={cpmValue3.title} value={cpmValue3.value} desc={cpmValue3.desc}/>
          <InformationCard key={cpmValue4.title} title={cpmValue4.title} value={cpmValue4.value} desc={cpmValue4.desc}/>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem"}}>
          <InformationCard key={cpmValue5.title} title={cpmValue5.title} value={cpmValue5.value} desc={cpmValue5.desc}/>
          <InformationCard key={cpmValue6.title} title={cpmValue6.title} value={cpmValue6.value} desc={cpmValue6.desc}/>
          <InformationCard key={cpmValue7.title} title={cpmValue7.title} value={cpmValue7.value} desc={cpmValue7.desc}/>
          <InformationCard key={cpmValue8.title} title={cpmValue8.title} value={cpmValue8.value} desc={cpmValue8.desc}/>
          <InformationCard key={cpmValue9.title} title={cpmValue9.title} value={cpmValue9.value} desc={cpmValue9.desc}/>
          <InformationCard key={cpmValue10.title} title={cpmValue10.title} value={cpmValue10.value} desc={cpmValue10.desc}/>
          <InformationCard key={cpmValue11.title} title={cpmValue11.title} value={cpmValue11.value} desc={cpmValue11.desc}/>
          <InformationCard key={cpmValue12.title} title={cpmValue12.title} value={cpmValue12.value} desc={cpmValue12.desc}/>
          <InformationCard key={cpmValue13.title} title={cpmValue13.title} value={cpmValue13.value} desc={cpmValue13.desc}/>
          <InformationCard key={cpmValue14.title} title={cpmValue14.title} value={cpmValue14.value} desc={cpmValue14.desc}/>
          <InformationCard key={cpmValue15.title} title={cpmValue15.title} value={cpmValue15.value} desc={cpmValue15.desc}/>
        </div>
      </div>
      <Alert className='w-80 absolute bottom-5 right-5'>
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              {statusText}
            </AlertDescription>
          </Alert>
      <Button onClick={test}>TEST</Button>
    </div>
  )
}

export default App
