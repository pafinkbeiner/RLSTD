import { Area, Bar, BarChart, CartesianGrid, ComposedChart, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

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
import { Subject } from "rxjs"
import { useEffect, useState } from "react"
import { Training, TrainingState } from "@/types/Training"

const chartConfig = {
  targetPower: {
    label: "TargetPower",
    color: "hsl(var(--chart-1))",
  },
  instantaneousPower: {
    label: "Instantaneous Power",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface IProps {
  training: Training;
}

export function TrainingChart({ training }: IProps) {

  const [chartData, setChartData] = useState<{ ts: number, targetPower: number }[]>([])
  const [trainingStatus, setTrainingStatus] = useState<TrainingState>(TrainingState.Stopped);

  useEffect(() => {

    let tempChartData = [];
    let lastTargetPower = training.targetPowerZones[0].target;
    for (let i = 0; i < training.targetedTrainingTime; i++) {
      const targetPowerZoneChange = training.targetPowerZones.find((v) => v.ts === i);
      if (targetPowerZoneChange) {
        lastTargetPower = targetPowerZoneChange.target;
      }
      tempChartData.push({
        ts: i,
        targetPower: lastTargetPower,
      });
    }
    setChartData(tempChartData);

    const subscription = training?.instanteneousPower?.asObservable().subscribe((v) => {
      setChartData((prevChartData: any) => {
        const existingDataPointIndex = prevChartData.findIndex((dataPoint: any) => dataPoint.ts === v.ts);
        if (existingDataPointIndex !== -1) {
          const updatedChartData = [...prevChartData];
          updatedChartData[existingDataPointIndex] = {
            ...updatedChartData[existingDataPointIndex],
            instantaneousPower: v.target,
          };
          return updatedChartData;
        }

        return [
          ...prevChartData,
          {
            ts: v.ts,
            instantaneousPower: v.target,
          },
        ].sort((a, b) => a.ts - b.ts);
      });
    });

    const trainingStatusSubscription = training.trainingStatus?.asObservable().subscribe((v) => {
      setTrainingStatus(v);
    });

    return () => {
      subscription?.unsubscribe();
      trainingStatusSubscription?.unsubscribe();
    };
  }, [training]);

  return (
    <Card className="flex-1 min-w-64">
      <CardHeader>
        <CardTitle>{training.title} {trainingStatus === TrainingState.Running && <span className="text-green-500">Running</span>}</CardTitle>
        {training.description && <CardDescription>{training.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{ height: "15rem", width: "100%" }}>

          <ComposedChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 3
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="ts"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {/* <Line
              dataKey="targetPower"
              type="monotone"
              stroke="var(--color-instantaneousPower)"
              strokeWidth={2}
              dot={false}
            /> */}
            <Area dataKey="targetPower"
              type="stepAfter"
              fill="var(--color-targetPower)"
              fillOpacity={0.4}
              stroke="var(--color-targetPower)"
              isAnimationActive={false}
            />
            {/* <Bar dataKey="ts" fill="var(--color-targetPower)" radius={8} isAnimationActive={false} /> */}
            <Line
              dataKey="instantaneousPower"
              type="monotone"
              stroke="var(--color-instantaneousPower)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>

        </ChartContainer>
      </CardContent>
    </Card>
  )
}
