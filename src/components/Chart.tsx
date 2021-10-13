import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import allData from "../algorithm/rtnData";
import { Transaction } from "../types";
import React from "react";

// WE'RE USING POST DATE

function Chart(props: any) {
  const getLargestPurchase = (): number => {
    let max: number = 0;
    for (let trans of props.data) {
      if (parseFloat(trans.CHARGE) > max) {
        max = parseFloat(trans.CHARGE);
      }
    }
    return max;
  };

  const handleClick = (event: any) => {
    allData.forEach((value: Transaction) => {
      if (value.POST_DATE === event.activeLabel) {
        props.setCurrentTrans(value);
      }
    });
  };

  return (
    <LineChart
      width={500}
      height={300}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      onClick={handleClick}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="TRANS_DATE" />
      <YAxis domain={[0, getLargestPurchase()]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="CHARGE"
        stroke="#FF7F7F"
        onMouseDown={handleClick}
      />
      {/*#8884d8*/}
    </LineChart>
  );
}

export default Chart;