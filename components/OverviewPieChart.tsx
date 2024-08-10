"use client";

import { ResponsiveContainer, Tooltip, PieChart, Cell, Pie } from "recharts";

interface OverviewPieChartProps {
  data: any[];
}

const PURPLE_COLORS = [
  "#089E70", // Slightly darker green
  "#0BBB84", // Slightly lighter green
  "#07A172", // Darker with a hint of teal
  "#12B78D", // Lighter green with more saturation
  "#0FAD78", // Similar green with a bit more depth
  "#0CA681", // Balanced green with a slight teal hue
  "#069F6E", // Darker with a stronger green presence
  "#11B586", // Vibrant green with a touch of brightness
  "#0EAA74", // Mid-tone green, slightly darker
  "#08A276", // Balanced green with a slight teal tint
];

const OverviewPieChart = ({ data }: OverviewPieChartProps) => {
  const filteredData = data.filter((item) => item.value !== 0);
  return (
    <div className='flex items-center justify-center'>
      <PieChart width={400} height={200}>
        <Pie
          data={filteredData}
          dataKey={"value"}
          nameKey={"name"}
          cx={"50%"}
          cy={"50%"}
          innerRadius={60}
          outerRadius={80}
          fill='#82CA9d'
          label={({ name, value }) => `${name} : ${value}`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PURPLE_COLORS[index % PURPLE_COLORS.length]}
            ></Cell>
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default OverviewPieChart;
