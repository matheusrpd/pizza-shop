import { BarChart } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function PopularProductsChart() {
  const chartData = [
    {
      product: 'peperoni',
      amount: 40,
      fill: 'var(--color-peperoni)',
    },
    {
      product: 'mussarela',
      amount: 32,
      fill: 'var(--color-mussarela)',
    },
    { product: 'marguerita', amount: 50, fill: 'var(--color-marguerita)' },
    { product: 'queijos', amount: 16, fill: 'var(--color-queijos)' },
    { product: 'frango', amount: 28, fill: 'var(--color-frango)' },
  ]

  const chartConfig = {
    peperoni: {
      label: 'Pizza Peperoni',
      color: 'hsl(var(--chart-1))',
    },
    mussarela: {
      label: 'Pizza Mussarela',
      color: 'hsl(var(--chart-2))',
    },
    marguerita: {
      label: 'Pizza Marguerita',
      color: 'hsl(var(--chart-3))',
    },
    queijos: {
      label: 'Pizza 4 queijos',
      color: 'hsl(var(--chart-4))',
    },
    frango: {
      label: 'Pizza Frango',
      color: 'hsl(var(--chart-5))',
    },
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(item, name) => (
                    <div className="flex w-full items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{
                          backgroundColor:
                            chartConfig[name as keyof typeof chartConfig]
                              ?.color,
                        }}
                      />
                      <p>
                        <span className="font-medium">{item}</span> pedidos
                      </p>
                    </div>
                  )}
                />
              }
            />

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="product"
              innerRadius={60}
            />

            <ChartLegend
              content={<ChartLegendContent nameKey="product" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
