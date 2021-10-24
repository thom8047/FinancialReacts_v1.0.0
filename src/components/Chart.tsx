import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import allData from "../algorithm/rtnData";
import { Transaction } from "../types";
import React from "react";

/* 
To get all dates within the data:
- First read through data to see which dates are within the date
- Combine duplicates, and add in $0 charges for the empty dates
- Don't mess up the display data, this will fuck up however the indices are read for the props.currentSelection
- Make sure this is worth implementing. 
*/

// WE'RE USING POST DATE
const getDate = (date: string) => {
  return Date.parse(date);
};
/* const getAllDates = (firstDate: string): number[] => {
  var month = parseInt(firstDate.split("/")[0]);
  var year = parseInt(firstDate.split("/")[2]);
  return Array.from(
    { length: new Date(year, month, 0).getDate() - 1 },
    (_, i) => Date.parse(new Date(year, month, i + 1).toLocaleDateString())
  );
}; */

function Chart(props: any) {
  const getLargestPurchase = (): number => {
    let max: number = 0;
    for (let trans of props.data) {
      var val = getDate(trans.POST_DATE);
      trans.newPOST_DATE = val;
      // console.log(trans.POST_DATE);
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

  const tickToDate = (tickVal: string) => {
    var date = new Date(parseInt(tickVal)).toLocaleDateString();
    return date;
  };

  const num = getLargestPurchase();

  return (
    <LineChart
      width={900}
      height={300}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      onClick={handleClick}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="newPOST_DATE"
        interval={"preserveStartEnd"}
        tickFormatter={tickToDate}
      />
      <YAxis domain={[0, num]} />
      <Tooltip />
      <ReferenceLine x={props.currentSelection} stroke="#fff" label="" />
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
