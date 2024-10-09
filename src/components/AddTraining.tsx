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
import AddTrainingAreaChart, { Operation } from "./AddTrainingAreaChart"
import { useState } from "react"
import { Metric } from "@/types/Training";
import { Subject } from "rxjs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const changeDataSubject: Subject<{ operation: Operation, data: Metric }> = new Subject();

export function AddTraining(props: any) {

  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [targetPower, setTargetPower] = useState<number>(0);

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
          <AddTrainingAreaChart changeDataSubject={changeDataSubject} setTargetPower={setTargetPower} setTimeStamp={setTimeStamp} />

          <div className="flex flex-col gap-2 w-64">
            <div className="flex flex-row gap-5 items-center">
              <Label>Timestamp</Label>
              <Input type="number" value={timeStamp} onChange={(e) => setTimeStamp(parseInt(e.target.value))} />
            </div>
            <div className="flex flex-row gap-5 items-center">
              <Label>Target Power</Label>
              <Input type="number" value={targetPower} onChange={(e) => setTargetPower(parseInt(e.target.value))} />
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <Button onClick={() => changeDataSubject.next({ operation: Operation.Add, data: { ts: timeStamp, target: targetPower } })}>Add Data Point</Button>
            <Button onClick={() => changeDataSubject.next({ operation: Operation.Remove, data: { ts: timeStamp, target: targetPower } })}>Remove Data Point</Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"}>Close</Button>
          </SheetClose>
          <Button type="submit">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}