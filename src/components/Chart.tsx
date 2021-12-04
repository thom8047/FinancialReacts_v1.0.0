import {
  // LineChart,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  // CartesianGrid,
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
  float,
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

  const getDailyIncome = (): number[] => {
    const copy = Array.from(data);
    let largestIncomeRange: number = 0;
    let smallestIncomeRange: number = 0;
    let _allIncome = 0;

    for (const trans of copy) {
      if (trans.CHARGE) {
        _allIncome -= float(trans.CHARGE);
      }
      if (trans.INCOME) {
        _allIncome += float(trans.INCOME);
      }

      smallestIncomeRange =
        _allIncome < smallestIncomeRange
          ? float(_allIncome)
          : smallestIncomeRange;
      largestIncomeRange =
        _allIncome > largestIncomeRange
          ? float(_allIncome)
          : largestIncomeRange;
    }

    console.log(
      "SMALL Y:",
      smallestIncomeRange,
      "LARGE Y: ",
      largestIncomeRange
    );

    return [smallestIncomeRange, largestIncomeRange];
  };

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
          allIncome -= float(trans.CHARGE);

          info.charge += float(trans.CHARGE);
          info.income = allIncome;
          info.descr.push(`${trans.DESCR}^%$${trans.CHARGE}`);
        }
        if (trans.INCOME) {
          allIncome += float(trans.INCOME);

          info.income = float(info.income + float(trans.INCOME));
          info.descr.push(`INCOME ${trans.DESCR}^%$${trans.INCOME}`);
        }
      }
    }

    if (info.charge) info.charge = float(info.charge);
    if (info.income) info.income = float(info.income);

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

  const getPercentage = (): number => {
    const [smallestIncomeRange, largestIncomeRange] = getDailyIncome();
    let total = largestIncomeRange - smallestIncomeRange;
    const posPercent = (total + smallestIncomeRange) / total;

    return Math.ceil(posPercent * 100);
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
          <stop offset="0%" stopColor="#82ca9d" stopOpacity={1} />
          <stop
            offset={`${getPercentage()}%`}
            stopColor="#82ca9d"
            stopOpacity={0}
          />
          <stop
            offset={`${getPercentage()}%`}
            stopColor="#FF7F7F"
            stopOpacity={0}
          />
          <stop offset="100%" stopColor="#FF7F7F" stopOpacity={1} />
        </linearGradient>
        {/* <linearGradient id="charge" x1="0" y1="-1" x2="0" y2="0">
          <stop offset="50%" stopColor="#FF7F7F" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#FF7F7F" stopOpacity={0.1} />
        </linearGradient> */}
      </defs>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis
        dataKey="date"
        interval={"preserveStartEnd"}
        tickFormatter={tickToDate}
      />
      <YAxis domain={["dataMin", "dataMax"]} />
      <Tooltip
        content={<CustomTooltip active={false} label={""} payload={[]} />}
        position={{ x: 800, y: -150 }}
      />
      <ReferenceLine x={0} stroke="#fff" label="" />
      <Legend
        // margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
        verticalAlign="top"
        align="right"
        height={30}
      />
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
      <ReferenceLine
        y={0}
        stroke="#fff"
        strokeDasharray="3 3"
        opacity={0.5}
        label=""
      />
    </ComposedChart>
  );
}

export default Chart;
