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
import { BehaviorSubject, Subject } from "rxjs"
import { useEffect, useState } from "react"
import { ExtMetric, InstantiatedTraining, Training, TrainingState } from "@/types/Training"

const chartConfig = {
  target: {
    label: "TargetPower",
    color: "hsl(var(--chart-1))",
  },
  instant: {
    label: "Instantaneous Power",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface IProps {
  training: InstantiatedTraining;
}

export function TrainingChart({ training }: IProps) {

  const [chartData, setChartData] = useState<ExtMetric[]>([]);
  const [trainingStatus, setTrainingStatus] = useState<TrainingState>(TrainingState.Stopped);
  const [currentTrainingSeconds, setCurrentTrainingSeconds] = useState(0);

  useEffect(() => {

    // Target Training Power Zones
    let tempChartData = [];
    let lastTargetPower = training.targetPowerZones[0].target;
    for (let i = 0; i < training.targetedTrainingTime; i++) {
      const targetPowerZoneChange = training.targetPowerZones.find((v) => v.ts === i);
      if (targetPowerZoneChange) {
        lastTargetPower = targetPowerZoneChange.target;
      }
      tempChartData.push({
        ts: i,
        target: lastTargetPower,
      });
    }
    setChartData(tempChartData);

    // Instant Power Data
    const subscription = training?.instanteneousPower?.asObservable().subscribe((v) => {
      setCurrentTrainingSeconds(v.ts);
      setChartData((prevChartData: any) => {
        const existingDataPointIndex = prevChartData.findIndex((dataPoint: any) => dataPoint.ts === v.ts);
        if (existingDataPointIndex !== -1) {
          const updatedChartData = [...prevChartData];
          updatedChartData[existingDataPointIndex] = {
            ...updatedChartData[existingDataPointIndex],
            instant: v.target,
          };
          training.trainingChartData = updatedChartData;
          return updatedChartData;
        }

        const updatedChartData = [
          ...prevChartData,
          {
            ts: v.ts,
            instant: v.target,
          },
        ].sort((a, b) => a.ts - b.ts);
        training.trainingChartData = updatedChartData;
        return updatedChartData;
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
        <CardTitle>{training.title} {trainingStatus === TrainingState.Running && <span className="text-green-500">Running ({Math.floor((currentTrainingSeconds / 60))}min{currentTrainingSeconds % 60}s)</span>}</CardTitle>
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
            <Area dataKey="target"
              type="stepAfter"
              fill="var(--color-target)"
              fillOpacity={0.4}
              stroke="var(--color-target)"
              isAnimationActive={false}
            />
            <Line
              dataKey="instant"
              type="monotone"
              stroke="var(--color-instant)"
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
