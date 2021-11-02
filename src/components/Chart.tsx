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
import spliceDataBasedOnDate from "../algorithm/spliceDataBasedOnDate";
// import { Transaction } from "../types";
import React from "react";

interface chargeInfo {
  charge: number;
  descr: string[];
}

/* 
To get all dates within the data:
- First read through data to see which dates are within the date
- Combine duplicates, and add in $0 charges for the empty dates
- Don't mess up the display data, this will fuck up however the indices are read for the props.currentSelection
- Make sure this is worth implementing. 
*/

// WE'RE USING POST DATE
// const getDate = (date: string) => {
//   return Date.parse(date);
// };
/* const getAllDates = (firstDate: string): number[] => {
  var month = parseInt(firstDate.split("/")[0]);
  var year = parseInt(firstDate.split("/")[2]);
  return Array.from(
    { length: new Date(year, month, 0).getDate() - 1 },
    (_, i) => Date.parse(new Date(year, month, i + 1).toLocaleDateString())
  );
}; */

function Chart(props: any) {
  const data: any[] = spliceDataBasedOnDate(props.dates);
  console.log(data);
  const getLargestPurchase = (): number => {
    let max: number = 0;
    for (let trans of data) {
      if (parseFloat(trans.CHARGE) > max) {
        max = parseFloat(trans.CHARGE);
      }
    }

    return max;
  };

  const putTransactionIn = (stringifiedDate: string): chargeInfo => {
    const info: chargeInfo = {
      charge: 0,
      descr: [],
    };

    const copy = Array.from(data);
    console.log(copy, stringifiedDate);

    for (const trans of copy) {
      const transactionDate: string = trans.TRANS_DATE.split("/")
        .map((ele: string) => parseInt(ele))
        .join("/");

      if (transactionDate === stringifiedDate) {
        info.charge += parseFloat(trans.CHARGE);
        info.descr.push(trans.DESCR);
      }
    }

    if (info.charge) info.charge = parseFloat(info.charge.toFixed(2));

    return info;
  };

  const getDatesForXAxis = (): any => {
    let { fromMonth, toMonth, year } = props.dates;
    fromMonth = parseInt(fromMonth) - 1;
    toMonth = parseInt(toMonth) - 1;
    year = parseInt(year);

    const startDate = new Date(year, fromMonth, 1);
    const endDate = new Date(year, toMonth, 1);

    const chartData: any[] = [];

    let dummy = new Date(year, fromMonth, 0);
    for (let i = 0; i < (+endDate - +startDate) / (60 * 60 * 24 * 1000); i++) {
      dummy.setDate(dummy.getDate() + 1);

      const obj: any = {
        date: dummy.getTime(),
        dateObj: new Date(dummy),
      };
      const stringifiedDate: string = `${
        dummy.getMonth() + 1
      }/${dummy.getDate()}/${dummy.getFullYear()}`;

      const { charge, descr } = putTransactionIn(stringifiedDate);
      obj.CHARGE = charge;
      obj.DESCR = descr.join(" | ");
      //console.log(charge + "\n");

      chartData.push(obj);
    }

    return chartData;
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
      data={getDatesForXAxis()}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        interval={"preserveStartEnd"}
        tickFormatter={tickToDate}
      />
      <YAxis domain={[0, num]} />
      <Tooltip />
      <ReferenceLine x={0} stroke="#fff" label="" />
      <Legend />
      <Line type="monotone" dataKey="CHARGE" stroke="#FF7F7F" />
      {/*#8884d8*/}
    </LineChart>
  );
}

export default Chart;
