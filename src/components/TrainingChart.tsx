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
import { Training } from "@/types/Training"

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

  const [chartData, setChartData] = useState<any>([])

  useEffect(() => {

    const chartData = training.targetPowerZones.map((v) => {
      return {
        ts: v.ts,
        targetPower: v.target,
      }
    })

    setChartData(chartData)
    return () => {
    };
  }, []);

  return (
    <Card className="flex-1 min-w-64">
      <CardHeader>
        <CardTitle>{training.title}</CardTitle>
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
            <Line
              dataKey="targetPower"
              type="monotone"
              stroke="var(--color-instantaneousPower)"
              strokeWidth={2}
              dot={false}
            />
            <Area dataKey="targetPower"
              type="stepAfter"
              fill="var(--color-targetPower)"
              fillOpacity={0.4}
              stroke="var(--color-targetPower)"
            />
            {/* <Bar dataKey="ts" fill="var(--color-targetPower)" radius={8} isAnimationActive={false} /> */}
            <Line
              dataKey="instantaneousPower"
              type="monotone"
              stroke="var(--color-instantaneousPower)"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>

        </ChartContainer>
      </CardContent>
    </Card>
  )
}
