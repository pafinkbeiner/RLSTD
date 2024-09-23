"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"

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

export const description = "A bar chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface IProps {
  title: string;
  description: string;
  data: Subject<any>;
  getter: (v: any) => number;
}

export function AreaChart({ title, description, data, getter }: IProps) {

  const [chartData, setChartData] = useState<Array<{month: number, desktop: number}>>([]);

  useEffect(() => {
    const subscription = data.asObservable().subscribe((v) => {
      setChartData((prevChartData) => [
        ...prevChartData,
        {
          month: Date.now(),
          desktop: getter(v),
        }
      ]);
    });
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
