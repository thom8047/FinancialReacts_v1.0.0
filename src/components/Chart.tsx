import {
  // LineChart,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { tooltipProps } from "../types";
import React from "react";

interface chargeInfo {
  charge: number;
  descr: string[];
}

// Main

function Chart(props: any) {
  const data: any[] = props.data;

  // Functions

  const getLargestPurchase = (): number => {
    let max: number = 0;
    for (let trans of data) {
      if (parseFloat(trans.CHARGE) > max) {
        max = parseFloat((parseFloat(trans.CHARGE) + 20).toFixed(2));
      }
    }

    return max;
  };

  const getReadableDateFromDateObj = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const putTransactionIn = (stringifiedDate: string): chargeInfo => {
    const info: chargeInfo = {
      charge: 0,
      descr: [],
    };

    const copy = Array.from(data);

    // Transaction date is the date we will use for all transactions.
    for (const trans of copy) {
      const transactionDate: string = trans.TRANS_DATE.split("/")
        .map((ele: string) => parseInt(ele))
        .join("/");

      if (transactionDate === stringifiedDate) {
        if (trans.CHARGE) {
          info.charge += parseFloat(trans.CHARGE);
          info.descr.push(`${trans.DESCR}^%$${trans.CHARGE}`);
        } else if (trans.INCOME) {
          // INCOME LOGIC
        }
      }
    }

    if (info.charge) info.charge = parseFloat(info.charge.toFixed(2));

    return info;
  };

  const getDatesForXAxis = (): any => {
    let { fromMonth, toMonth, fromYear, toYear } = props.dates;
    fromMonth = parseInt(fromMonth) - 1;
    fromYear = parseInt(fromYear);
    toMonth = parseInt(toMonth) - 1;
    toYear = parseInt(toYear);

    const startDate = new Date(fromYear, fromMonth, 1);
    const endDate = new Date(toYear, toMonth, 1);

    const chartData: any[] = [];

    let dummy = new Date(fromYear, fromMonth, 0);
    for (let i = 0; i < (+endDate - +startDate) / (60 * 60 * 24 * 1000); i++) {
      dummy.setDate(dummy.getDate() + 1);

      const obj: any = {
        date: dummy.getTime(),
        dateObj: new Date(dummy),
      };
      const stringifiedDate: string = getReadableDateFromDateObj(dummy);

      const { charge, descr } = putTransactionIn(stringifiedDate);
      obj.CHARGE = charge;
      obj.DESCR = descr.join(`|^`);

      chartData.push(obj);
    }

    return chartData;
  };

  const CustomTooltip = ({ active, payload, label }: tooltipProps) => {
    if (active && payload && payload.length) {
      return payload[0].value > 0 ? (
        <div>
          <div className="custom-tooltip">
            DATE -{"> "}
            {getReadableDateFromDateObj(new Date(label))}
          </div>
          {payload[0].payload.DESCR.split("|^").map((descr: string) => {
            return (
              <div key={descr} className="custom-tooltip">
                <div>{descr.split("^%$")[0]}</div>
                <div>$ {descr.split("^%$")[1]}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="custom-tooltip">
            DATE -{"> "}
            {getReadableDateFromDateObj(new Date(label))}
          </div>
        </div>
      );
    }

    return null;
  };

  const tickToDate = (tickVal: string) => {
    var date = new Date(parseInt(tickVal)).toLocaleDateString();
    return date;
  };

  return (
    <ComposedChart
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
      <YAxis domain={[0, getLargestPurchase()]} />
      <Tooltip
        content={<CustomTooltip active={false} label={""} payload={[]} />}
        position={{ x: 800, y: -150 }}
      />
      <ReferenceLine x={0} stroke="#fff" label="" />
      <Legend height={36} />
      <Line type="monotone" dataKey="CHARGE" stroke="#FF7F7F" dot={false} />
      {/*#8884d8*/}
    </ComposedChart>
  );
}

export default Chart;
