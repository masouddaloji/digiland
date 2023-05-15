// Rechart
import {
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// variables
import { monthlyInformationChart } from "./../../../Constants";
// styles
import "./Chart.css";

const Chart = () => {
  return (
    <div className="chart__wrapper">
    <h2 className="chart__header">آمار فروش سالانه</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={monthlyInformationChart}
          margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month"  stroke="#191919" angle={-20} textAnchor="end"/>
          <YAxis dataKey="sales" interval={0} stroke="#191919"/>
          <CartesianGrid horizontal="true" vertical="" />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#67032F" strokeWidth={2} activeDot={{r:7}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
