// Rechart
import {
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  Label,
  
} from "recharts";

// variables
import { monthlyInformationChart } from "./../../../Constants";
// styles
import "./Chart.css";

const Chart = () => {
  const CustomTooltip = ({ active, payload, label }) =>{
    if(active){
      return (<div className="chartTooltip">
        <span className="chartTooltip__date">{`${label} ماه :`}
        <span>1402</span>
        </span>
        <p className="chartTooltip__details">
           سود : 
          <span className="chartTooltip__number">{`${payload[0]?.payload["سود"]} میلیون`}</span>
        </p>
      </div>)
    }
    return null
  }
  return (
    <div className="chart__wrapper ss02">
      <h2 className="chart__header">آمار فروش سالانه</h2>
      <ResponsiveContainer minWidth={500} maxWidth="100%" height={300}>
        <AreaChart
          data={monthlyInformationChart}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="sale" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="21.11%"
                stopColor="rgba(144, 125, 255, 0.29)"
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor="rgba(214, 214, 214, 0)"
                stopOpacity={1}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            angle={-20}
          >
          </XAxis>
          <YAxis
            tickCount={8}
            tickLine={false}
            axisLine={false}
            tickFormatter={(number) => `${number}`}
            tick={{ fontSize: 11}}
            label={{ value: 'بر حسب (میلیون تومان)', angle: -90, position: 'insideLeft' }}
          />
          <CartesianGrid vertical={false} opacity={0.5} fillRule="#CFCFCF" strokeDasharray="2 2"/>
          <Tooltip content={CustomTooltip}/>
          <Area
            type="monotone"
            dataKey="فروش"
            stroke="#2916FF"
            fillOpacity={1}
            fill="url(#sale)"
          />
         
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

{
  /* <BarChart
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

<Bar dataKey="فروش" fill="#1f75fe" radius={[10, 10, 0, 0]}>
  <LabelList dataKey="فروش" position="top" />
</Bar>
<Bar dataKey="سود" fill="#ffab00" radius={[10, 10, 0, 0]}>
  <LabelList dataKey="سود" position="top" />
</Bar>
</BarChart> */
}
