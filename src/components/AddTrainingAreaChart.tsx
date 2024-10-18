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
  chartData: Array<Metric>;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  setTargetPower: React.Dispatch<React.SetStateAction<number>>;
}

function AddTrainingAreaChart({ chartData, setTimeStamp, setTargetPower }: IProps) {

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
              onClick={(e: any) => {
                setTimeStamp(e.value);
                const power = chartData.find(item => item.ts == e.value)?.target;
                if(power){
                  setTargetPower(power)
                }
              }}
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