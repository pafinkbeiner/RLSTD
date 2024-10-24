import { Area,CartesianGrid, ComposedChart, Line, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
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
import { ExtMetric, Training } from "@/types/Training"
import { Trash } from "lucide-react"

const chartConfig = {
  target: {
    label: "Target Power",
    color: "hsl(var(--chart-1))",
  },
  instant: {
    label: "Instantaneous Power",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface IProps {
  training: Training;
  deleteTraining: () => void;
}

export function PassivTrainingChart({ training, deleteTraining }: IProps) {

  const [chartData, setChartData] = useState<ExtMetric[]>([])

  useEffect(() => {
    if(training.trainingChartData != undefined){
      setChartData(training.trainingChartData);
    }
  }, [training]);

  return (
    <Card className="flex-1 min-w-64">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <CardTitle>{training.title}</CardTitle>
            {training.description && <CardDescription>{training.description}</CardDescription>}
          </div>
          <Trash className="cursor-pointer" onClick={deleteTraining} height={20} width={20}/>
        </div>
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
