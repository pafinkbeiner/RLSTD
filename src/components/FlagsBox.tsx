import { useEffect, useState } from "react";
import { ComboBox } from "./ComboBox"
import { Card, CardTitle } from "./ui/card"
import { connected, notify_0x2AD2, read_0x2ACC } from "@/lib/bluetooth";
import { convert_0x2ACC, convert_0x2AD2, flags_0x2ACC_FMFF, flags_0x2ACC_TSFF, flags_0x2AD2 } from "@/lib/convert";
import Circle from "./Circle";

const options = [
  { value: "indoor_bike_data", label: "Indoor Bike Data" },
  { value: "fitness_machine_feature", label: "Fitness Machine Feature" },
  { value: "target_setting_feature", label: "Target Setting Feature" },
];

const FlagsBox = () => {

  const [connectedState, setConnectedState] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [flag_0x2AD2, setFlags_0x2AD2] = useState<number>(0);
  const [flag_0x2ACC_FMFF, setFlags_0x2ACC_FMFF] = useState<number>(0);
  const [flag_0x2ACC_TSFF, setFlags_0x2ACC_TSFF] = useState<number>(0);

  useEffect(() => {

    const sub_connected = connected.asObservable().subscribe(v => setConnectedState(v));

    const sub_0x2AD2 = notify_0x2AD2.asObservable().subscribe(v => {
      const value = convert_0x2AD2(v);
      setFlags_0x2AD2(value.flags);
    });

    read_0x2ACC?.refresh().then(v => {
      const value = convert_0x2ACC(v);
      setFlags_0x2ACC_FMFF(value.fitnessMachineFeatures);
      setFlags_0x2ACC_TSFF(value.targetSettingFeatures);
    });

    return () => {
      sub_0x2AD2.unsubscribe();
      sub_connected.unsubscribe();
    }
  }, [])


  return (
    <Card style={{ height: "22.125rem" }} className='min-w-64 flex-1 p-5'>
      <div className="flex flex-row items-center justify-between mb-4">
        <CardTitle>Berechtigungen (Connected: {connectedState.toString()})</CardTitle>
        <ComboBox options={options} valueChanged={(v) => setSelectedOption(v)} />
      </div>
      <div className='flex flex-col gap-3 pt-3 overflow-y-auto max-h-64 pr-5'>
        {
          selectedOption === "indoor_bike_data" &&
          Object.entries(flags_0x2AD2).map(([key, value]: [string, any]) => {
            return (
              <div key={key} className='flex flex-row items-center justify-between'>
                <p className="text-xs">{key}</p>
                {(value & flag_0x2AD2) > 0 ? <Circle color="#006600" /> : <Circle color="#660000" />}
              </div>
            )
          })
        }
        {
          selectedOption === "fitness_machine_feature" &&
          Object.entries(flags_0x2ACC_FMFF).map(([key, value]: [string, any]) => {
            return (
              <div key={key} className='flex flex-row items-center justify-between'>
                <p className="text-xs">{key}</p>
                {(value & flag_0x2ACC_FMFF) > 0 ? <Circle color="#006600" /> : <Circle color="#660000" />}
              </div>
            )
          })
        }
        {
          selectedOption === "target_setting_feature" &&
          Object.entries(flags_0x2ACC_TSFF).map(([key, value]: [string, any]) => {
            return (
              <div key={key} className='flex flex-row items-center justify-between'>
                <p className="text-xs">{key}</p>
                {(value & flag_0x2ACC_TSFF) > 0 ? <Circle color="#006600" /> : <Circle color="#660000" />}
              </div>
            )
          })
        }
      </div>
    </Card>
  )
}

export default FlagsBox