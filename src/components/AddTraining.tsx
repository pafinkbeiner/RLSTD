import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AddTrainingAreaChart from "./AddTrainingAreaChart"
import { useState } from "react"
import { Metric, Training } from "@/types/Training";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export function AddTraining() {

  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [targetPower, setTargetPower] = useState<number>(0);
  const [trainingTitle, setTrainingTitle] = useState<string>("");

  const [chartData, setChartData] = useState<Array<Metric>>([
    { ts: 0, target: 100 },
    { ts: 1, target: 200 },
    { ts: 2, target: 150 },
    { ts: 3, target: 100 },
  ])

  const addChartData = (v: Metric) => {
    setChartData((prevChartData: any) => {
      const existingDataPointIndex = prevChartData.findIndex((dataPoint: any) => dataPoint.ts === v.ts);
      if (existingDataPointIndex !== -1) {
        const updatedChartData = [...prevChartData];
        updatedChartData[existingDataPointIndex] = {
          ...updatedChartData[existingDataPointIndex],
          target: v.target,
        };
        return updatedChartData;
      }
      return [
        ...prevChartData,
        {
          ts: v.ts,
          target: v.target,
        },
      ].sort((a, b) => a.ts - b.ts);
    });
  }

  const removeChartData = (data: Metric) => {
    setChartData((prevChartData: any) => {
      return prevChartData.filter((v: any) => v.ts !== data.ts);
    });
  }

  const saveTraining = () => {
    // store training to local storage
    const training: Training = {
      id: crypto.randomUUID(),
      title: trainingTitle,
      targetedTrainingTime: chartData[chartData.length - 1].ts + 1,
      targetPowerZones: chartData,
      cloudSynchronised: false
    }
    localStorage.setItem(`training-${training.id}`, JSON.stringify(training));

    // set back controls
    setTimeStamp(0);
    setTargetPower(0);
    setTrainingTitle("");
    setChartData([
      { ts: 0, target: 100 },
      { ts: 1, target: 200 },
      { ts: 2, target: 150 },
      { ts: 3, target: 100 },
    ]);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Configure Own Training</Button>
      </SheetTrigger>
      <SheetContent className="bg-background text-primary" side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Add new custom Training</SheetTitle>
          <SheetDescription>
            Make Changes to the Training by adding or removing data points.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 pt-5 pb-5">
          <AddTrainingAreaChart chartData={chartData} setTargetPower={setTargetPower} setTimeStamp={setTimeStamp} />

          <div className="flex flex-col gap-2 w-96">
            <div className="flex flex-row gap-5 items-center">
              <Label>Trainings titel</Label>
              <Input type="string" value={trainingTitle} onChange={(e) => setTrainingTitle(e.target.value)} />
            </div>
            <div className="flex flex-row gap-5 items-center">
              <Label>Timestamp</Label>
              <Input type="number" value={timeStamp} onChange={(e) => {
                const value = parseInt(e.target.value);
                setTimeStamp(value);
                // if (!isNaN(value)) {
                  
                // }
              }} />
            </div>
            <div className="flex flex-row gap-5 items-center">
              <Label>Target Power</Label>
              <div className="flex flex-row gap-3 w-full">
                <Slider onValueChange={(e) => setTargetPower(e[0])} defaultValue={[targetPower]} value={[targetPower]} max={1000} step={10} />
                ({targetPower})
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <Button onClick={() => addChartData({ ts: timeStamp, target: targetPower })}>Add Data Point</Button>
            <Button onClick={() => removeChartData({ ts: timeStamp, target: targetPower })}>Remove Data Point</Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"}>Close</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit" onClick={saveTraining}>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}