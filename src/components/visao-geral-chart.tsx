
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react";

const staticData = [
  { month: "Jan", total: 2500 },
  { month: "Fev", total: 3000 },
  { month: "Mar", total: 2000 },
  { month: "Abr", total: 2780 },
  { month: "Mai", total: 1890 },
  { month: "Jun", total: 2390 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--primary))",
  },
};

interface VisaoGeralChartProps {
    data?: { month: string; total: number }[];
}

export function VisaoGeralChart({ data: propData }: VisaoGeralChartProps) {
  const [chartData, setChartData] = useState(staticData);

  useEffect(() => {
    if (propData && propData.length > 0) {
      setChartData(propData);
    }
  }, [propData]);


  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$${Number(value) / 1000}k`}
          />
           <Tooltip
            cursor={false}
            content={<ChartTooltipContent
              formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              indicator="dot"
            />}
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
