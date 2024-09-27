import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  size: number;
}

export function SpeedChart({ title, description, data, getter, size}: IProps) {

  const [chartData, setChartData] = useState<any>([])

  useEffect(() => {
    const subscription = data.asObservable().subscribe((v) => {
      let t: number = getter(v);
      // Just to debug
      // t += Math.random() * 10;
      setChartData((prevChartData: any) => {

        if(prevChartData.length >= size){
          const temp = prevChartData.slice();
          temp.shift();
          return [
            ...(temp),
            {
              month: Date.now(),
              desktop: t,
            }
          ]
        } else {
          return [
            ...prevChartData,
            {
              month: Date.now(),
              desktop: t,
            }
          ]
        }

      });
    });
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{height: "15rem", width: "100%"}}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false} 
              tickFormatter={(value) => new Date(value).getSeconds().toString()}/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} isAnimationActive={false} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
