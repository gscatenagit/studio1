"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

const data = [
  { month: "Jul", balance: 12345 },
  { month: "Ago", balance: 20339 },
  { month: "Set", balance: 28100 },
  { month: "Out", balance: 35000 },
  { month: "Nov", balance: 42500 },
  { month: "Dez", balance: 51000 },
];

const chartConfig = {
  balance: {
    label: "Saldo",
    color: "hsl(var(--primary))",
  },
};

export function FluxoCaixaChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={(value) => `R$${Number(value) / 1000}k`}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent
                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                indicator="dot"
            />}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="var(--color-balance)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-balance)",
              r: 4
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
