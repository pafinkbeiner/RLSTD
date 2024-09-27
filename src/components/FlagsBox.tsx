import { useEffect, useState } from "react";
import { ComboBox } from "./ComboBox"
import { Card, CardTitle } from "./ui/card"
import { notify_0x2AD2 } from "@/lib/bluetooth";
import { convert_0x2AD2, flags_0x2AD2 } from "@/lib/convert";

const options = [
  { value: "indoor_bike_data", label: "Indoor Bike Data" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const FlagsBox = () => {

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [flag_0x2AD2, setFlags_0x2AD2] = useState<number>(0);

  useEffect(() => {

    const sub_0x2AD2 = notify_0x2AD2.asObservable().subscribe(v => {
      const value = convert_0x2AD2(v);
      setFlags_0x2AD2(value.flags);
    });

    return () => {
      sub_0x2AD2.unsubscribe();
    }
  }, [])


  return (
    <Card style={{ height: "22.125rem" }} className='min-w-64 flex-1 p-5'>
      <div className="flex flex-row items-center justify-between mb-4">
        <CardTitle>Berechtigungen</CardTitle>
        <ComboBox options={options} valueChanged={(v) => setSelectedOption(v)} />
      </div>
      <div className='flex flex-col gap-3 pt-3 overflow-y-auto max-h-64 pr-5'>
        {
          selectedOption === "indoor_bike_data" &&
          Object.entries(flags_0x2AD2).map(([key, value]: [string, any]) => {
            return (
              <div key={key} className='flex flex-row items-center justify-between'>
                <p>{key}</p>
                <p>{(value & flag_0x2AD2) > 0 ? "true" : "false"}</p>
              </div>
            )
          })
        }
      </div>
    </Card>
  )
}

export default FlagsBox