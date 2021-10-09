import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from "react";

function Chart(props: any) {
  return (
    <LineChart
      width={500}
      height={300}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="TRANS_DATE" />
      <YAxis domain={[0, 130]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="CHARGE" stroke="#FF7F7F" />
      {/*#8884d8*/}
    </LineChart>
  );
}

export default Chart;
