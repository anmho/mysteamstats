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
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        <PieChart width="100%" height="100%" onMouseEnter={console.log("*")}>
          <Pie
            data={this.props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            // outerRadius={80}
            fill="#8884d8"
            dataKey="playtime"
          >
            {this.props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={this.props.COLORS[index % this.props.COLORS.length]}
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
