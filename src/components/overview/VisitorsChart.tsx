import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts"

const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 305 },
  { month: "March", visitors: 237 },
  { month: "April", visitors: 73 },
  { month: "May", visitors: 209 },
  { month: "June", visitors: 214 },
]

// Define the interface for the tooltip props
interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
        <p className="font-semibold">{label}</p>
        <p className="text-sm">Visitors: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function VisitorsChart() {
  const {t}= useTranslation()
  return (
    <div className="bg-white rounded-[20px] w-[30%] lt-sm:w-full overflow-hidden ">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{t('overview.charts.visitorsChart.title')}</h2>
      </div>
      <div className="px-6 py-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="visitors" fill="#88AB61" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
