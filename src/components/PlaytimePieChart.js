import React, { PureComponent } from "react";
import dummy from "../dummy.json";
import {
  Tooltip,
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

const data = dummy.response.games
  .map((game) => {
    return {
      name: game.name,
      playtime: game.playtime_forever / 60,
    };
  })
  .sort((a, b) => {
    if (a.playtime === b.playtime) {
      return a.name > b.name ? 1 : -1;
    }
    return a.playtime - b.playtime;
  });

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PlaytimePieChart extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <PieChart width="100%" height="100%" onMouseEnter={console.log("*")}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            // outerRadius={80}
            fill="#8884d8"
            dataKey="playtime"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            wrapperStyle={{
              fontFamily: "Roboto",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
