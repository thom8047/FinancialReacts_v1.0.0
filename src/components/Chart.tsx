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
  Area,
} from "recharts";
import { tooltipProps } from "../types";
import {
  rmvExtraText,
  returnBold,
  getReadableDateFromDateObj,
  getLargestPurchase,
} from "../utils";
import React from "react";

interface transactionInfo {
  charge: number;
  descr: string[];
  income: number;
}

// Main

function Chart(props: any) {
  let allIncome = 0;
  const data: any[] = props.data;

  // Functions

  const putTransactionIn = (stringifiedDate: string): transactionInfo => {
    const info: transactionInfo = {
      charge: 0,
      descr: [],
      income: allIncome,
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
          allIncome =
            /* allIncome - parseFloat(trans.CHARGE) < 0
              ? 0
              :  */ allIncome - parseFloat(trans.CHARGE);
          info.descr.push(`${trans.DESCR}^%$${trans.CHARGE}`);
        }
        if (trans.INCOME) {
          info.income += parseFloat(trans.INCOME);
          allIncome += parseFloat(trans.INCOME);
          info.descr.push(`INCOME ${trans.DESCR}^%$${trans.INCOME}`);
          console.log(info);
        }
      }
    }

    if (info.charge) info.charge = parseFloat(info.charge.toFixed(2));
    if (info.income) info.income = parseFloat(info.income.toFixed(2));

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

      const { charge, descr, income } = putTransactionIn(stringifiedDate);

      obj.CHARGE = charge;
      obj.DESCR = descr.join(`|^`);
      obj.INCOME = income;

      chartData.push(obj);
    }

    return chartData;
  };

  const CustomTooltip = ({ active, payload, label }: tooltipProps) => {
    if (active && payload && payload.length) {
      return payload[0].payload.DESCR ? (
        <div>
          <div className="custom-tooltip">
            DATE -{"> "}
            {getReadableDateFromDateObj(new Date(label))}
          </div>
          {payload[0].payload.DESCR.split("|^").map((descr: string) => {
            return (
              <div key={descr} className="custom-tooltip">
                <div>
                  --- {returnBold("Description", "#fff")}{" "}
                  -----------------------------------------
                </div>
                <div>{rmvExtraText(descr.split("^%$")[0])}</div>
                <div>
                  --- {returnBold("Amount", "#fff")}{" "}
                  ---------------------------------------------
                </div>
                <div>
                  ${" "}
                  {descr.split("^%$")[0].split(" ")[0] === "INCOME"
                    ? returnBold(rmvExtraText(descr.split("^%$")[1]), "#82ca9d")
                    : returnBold(
                        rmvExtraText(descr.split("^%$")[1]),
                        "#FF7F7F"
                      )}
                </div>
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
      <defs>
        <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="charge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="50%" stopColor="#FF7F7F" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#FF7F7F" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        interval={"preserveStartEnd"}
        tickFormatter={tickToDate}
      />
      <YAxis domain={[0, getLargestPurchase(props.data, 20)]} />
      <Tooltip
        content={<CustomTooltip active={false} label={""} payload={[]} />}
        position={{ x: 800, y: -150 }}
      />
      <ReferenceLine x={0} stroke="#fff" label="" />
      <Legend height={36} />
      <Area
        type="monotone"
        dataKey="INCOME"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#income)"
      />
      <Line
        type="monotone"
        dataKey="CHARGE"
        stroke="#FF7F7F"
        dot={false}
        fillOpacity={1}
        fill="url(#charge)"
      />
    </ComposedChart>
  );
}

export default Chart;
