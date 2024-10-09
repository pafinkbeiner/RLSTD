import { Activity, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { Metric } from "@/types/Training"
import { Subject } from "rxjs"

const chartConfig = {
  target: {
    label: "Target",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  },
} satisfies ChartConfig

export enum Operation {
  Add,
  Remove
}

interface IProps {
  changeDataSubject: Subject<{ operation: Operation, data: Metric }>;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  setTargetPower: React.Dispatch<React.SetStateAction<number>>;
}

function AddTrainingAreaChart({ changeDataSubject, setTimeStamp, setTargetPower }: IProps) {

  const [chartData, setChartData] = useState<Array<Metric>>([
    { ts: 1, target: 100 },
    { ts: 2, target: 200 },
    { ts: 3, target: 150 },
    { ts: 4, target: 100 },
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

  useEffect(() => {
    const subscription = changeDataSubject.subscribe((v) => {
      if (v.operation === Operation.Add) {
        addChartData(v.data);
      } else if (v.operation === Operation.Remove) {
        removeChartData(v.data);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [])


  return (
    <Card className="flex-1 min-w-64">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{ height: "15rem", width: "100%" }}>
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="ts"
              style={{cursor: "pointer", fontSize: "1.5em"}}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              onClick={(e: any) => setTimeStamp(e.value)}
              tickFormatter={(value) => value} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area onClick={(e) => {console.log("2", e)}} type="stepAfter" dataKey="target" fill="var(--color-target)" radius={8} isAnimationActive={false} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AddTrainingAreaChart