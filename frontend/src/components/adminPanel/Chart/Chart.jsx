import React from "react";
// Rechart
import {
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// variables
import { monthlyInformationChart } from "./../../../Constants";
// styles
import "./Chart.css";

const Chart = () => {
  return (
    <div className="chrt__wrapper">
      <ResponsiveContainer>
        {/* <LineChart data={monthlyInformationChart} margin={{
              top: 5,
              right:30,
              left: 30,
              bottom: 5,
            }} >
          <XAxis dataKey="month" interval={0} tickSize={5}/>
          <YAxis dataKey="sales" interval={0} tickSize={5} tickLine={false}/>/
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#1463F3"
            strokeWidth={2}
            strokeOpacity={0.7}
          />
        </LineChart> */}
        <LineChart
          data={monthlyInformationChart}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          {/* <YAxis dataKey="sales"/> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#1463F3"
            strokeWidth={2}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
