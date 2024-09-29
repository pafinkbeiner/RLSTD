import { useEffect, useState } from "react";
import { ComboBox } from "./ComboBox"
import { Card, CardTitle } from "./ui/card"
import { connected, notify_0x2A63, notify_0x2AD2, read_0x2ACC } from "@/lib/bluetooth";
import { convert_0x2A63, convert_0x2ACC, convert_0x2AD2, flags_0x2A63, flags_0x2ACC_FMFF, flags_0x2ACC_TSFF, flags_0x2AD2 } from "@/lib/convert";
import Circle from "./Circle";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const options = [
  { value: "indoor_bike_data", label: "Indoor Bike Data" },
  { value: "fitness_machine_feature", label: "Fitness Machine Feature" },
  { value: "target_setting_feature", label: "Target Setting Feature" },
  { value: "cycling_power_measurement", label: "Cycling Power Measurement" },
];

const FlagsBox = () => {

  const [connectedState, setConnectedState] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [flag_0x2AD2, setFlag_0x2AD2] = useState<number>(0);
  const [flag_0x2A63, setFlag_0x2A63] = useState<number>(0);
  const [flag_0x2ACC_FMFF, setFlag_0x2ACC_FMFF] = useState<number>(0);
  const [flag_0x2ACC_TSFF, setFlag_0x2ACC_TSFF] = useState<number>(0);

  const refresh = () => {
    read_0x2ACC?.refresh().then(v => {
      const value = convert_0x2ACC(v);
      setFlag_0x2ACC_FMFF(value.fitnessMachineFeatures);
      setFlag_0x2ACC_TSFF(value.targetSettingFeatures);
    });
  };

  useEffect(() => {

    const sub_connected = connected.asObservable().subscribe(v => {
      setConnectedState(v);
      // refresh read
      refresh();
    });

    // get subscribe data
    const sub_0x2AD2 = notify_0x2AD2.asObservable().subscribe(v => {
      const value = convert_0x2AD2(v);
      setFlag_0x2AD2(value.flags);
    });

    const sub_0x2A63 = notify_0x2A63.asObservable().subscribe(v => {
      const value = convert_0x2A63(v);
      setFlag_0x2A63(value.flags);
    });

    // get read data
    refresh();

    return () => {
      sub_0x2AD2.unsubscribe();
      sub_0x2A63.unsubscribe();
      sub_connected.unsubscribe();
    }
  }, [])

  return (
    <Card style={{ height: "22.125rem" }} className='min-w-64 flex-1 p-5'>
      <div className="flex flex-row items-center justify-between mb-4 flex-wrap gap-4">
        <CardTitle className="flex-1">Berechtigungen (Connected: {connectedState.toString()})</CardTitle>
        <ComboBox options={options} valueChanged={(v) => setSelectedOption(v)} />
      </div>
      <ScrollArea className='flex flex-col  t-3 overflow-y-auto max-h-64 pr-5'>
        {
          selectedOption === "indoor_bike_data" &&
          Object.entries(flags_0x2AD2).map(([key, value]: [string, any]) => {
            return (
              <div key={key} className='flex flex-row items-center justify-between mb-1'>
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
              <div key={key} className='flex flex-row items-center justify-between mb-1'>
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
              <div key={key} className='flex flex-row items-center justify-between mb-1'>
                <p className="text-xs">{key}</p>
                {(value & flag_0x2ACC_TSFF) > 0 ? <Circle color="#006600" /> : <Circle color="#660000" />}
              </div>
            )
          })
        }
        {
          selectedOption === "cycling_power_measurement" &&
          Object.entries(flags_0x2A63).map(([key, value]: [string, any]) => {
            return (
              <div key={key} className='flex flex-row items-center justify-between mb-1'>
                <p className="text-xs">{key}</p>
                {(value & flag_0x2A63) > 0 ? <Circle color="#006600" /> : <Circle color="#660000" />}
              </div>
            )
          })
        }
      </ScrollArea >
    </Card>
  )
}

export default FlagsBox