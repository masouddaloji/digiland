// Rechart
import {
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Legend,
  Bar,
  LabelList,
  Brush,
} from "recharts";

// variables
import { monthlyInformationChart } from "./../../../Constants";
// styles
import "./Chart.css";

const Chart = () => {
  return (
    <div className="chart__wrapper ss02">
      <h2 className="chart__header">آمار فروش سالانه</h2>
      <ResponsiveContainer  width="100%" height="90%">
        <BarChart
          data={monthlyInformationChart}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid fill="#eee" vertical={false} />
          <Brush dataKey='month' height={15} stroke="#1f75fe"/>
          <XAxis dataKey="month" interval="preserveStart" />
          <YAxis dataKey="فروش" domain={[0, "dataMax + 1000"]} tickCount={8} />
          <Tooltip cursor={{ fill: "transparent" }} />
          {/* <Legend /> */}
          <Bar dataKey="فروش" fill="#1f75fe" radius={[10, 10, 0, 0]}>
            <LabelList dataKey="فروش" position="top" />
          </Bar>
          <Bar dataKey="سود" fill="#ffab00" radius={[10, 10, 0, 0]}>
            <LabelList dataKey="سود" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
