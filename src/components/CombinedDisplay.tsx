import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { tooltipProps } from "../types";
import { returnBold, rmvExtraText } from "../utils";
import React from "react";

interface Props {
  name: string;
  dataK: any[];
  dataC: any[];
}

function CombinedDisplay(props: Props) {
  const getIntVals = (data: any[]) => {
    return data.map((trans) => {
      trans.CHARGE = parseFloat(trans.CHARGE);
      return trans;
    });
  };
  const getDiff = (): number[] => {
    if (props.dataC.length && props.dataK.length) {
      let c: number = 0,
        k: number = 0;
      props.dataC.forEach((trans) => {
        c += parseFloat(trans.CHARGE);
      });
      props.dataK.forEach((trans) => {
        k += parseFloat(trans.CHARGE);
      });
      return [parseFloat(c.toFixed(2)), parseFloat(k.toFixed(2))];
    }
    return [0];
  };
  const getPaymentAmount = (who: string) => {
    const [c, k] = getDiff();
    const each = parseFloat(((c + k) / 2).toFixed(2));
    const amountPaidK = parseFloat((each - k).toFixed(2));
    const amountPaidC = parseFloat((each - c).toFixed(2));
    return who === "c"
      ? [
          {
            descr: "Total of what each owes",
            value: c,
            fill: "#AEBCC4",
          },
          {
            descr: amountPaidC > 0 ? "Gives" : "Gets",
            value: Math.abs(amountPaidC),
            fill: amountPaidC > 0 ? "	#FF0000" : "#008000",
            type: amountPaidC > 0 ? "owe" : "should get paid",
            percent: c / (c + k),
            total: c + k,
          },
        ]
      : [
          {
            descr: "Total of what each owes",
            value: k,
            fill: "#AEBCC4",
          },
          {
            descr: amountPaidK > 0 ? "Gives" : "Gets",
            value: Math.abs(amountPaidK),
            fill: amountPaidK > 0 ? "#FF0000" : "#008000",
            type: amountPaidK > 0 ? "owe" : "should get paid",
            percent: k / (c + k),
            total: c + k,
          },
        ];
  };
  const CustomTooltip = ({ active, payload, label }: tooltipProps) => {
    if (active && payload && payload.length && payload[0].payload.CHARGE) {
      return (
        <div>
          <div className="custom-tooltip">
            {rmvExtraText(payload[0].payload.DESCR)}:
          </div>
          {parseFloat(payload[0].payload.CHARGE).toFixed(2)}
        </div>
      );
    } else {
      return null;
    }
  };
  const styleKObj: any = {
    position: "absolute",
    width: "50%",
    display: "inline-block",
    marginLeft: props.name === "kyle" ? "50%" : "100%",
    marginTop: "-75px",
    transitionTimingFunction: "ease",
    // border: "1px solid #fff",
    transition: "1s",
  };
  const styleCObj: any = {
    position: "absolute",
    width: "50%",
    display: "inline-block",
    marginLeft: props.name === "camryn" ? "50%" : "100%",
    marginTop: "-75px",
    transitionTimingFunction: "ease",
    // border: "1px solid #fff",
    transition: "1s",
  };

  const getPaymentAmountData: any = getPaymentAmount(
    props.name.split("")[0]
  )[1];

  return (
    <div className="combinedDataDisplay">
      <div className="description-title">{props.name}</div>
      <div className="description-text">
        <div>
          Number of charges:
          {props.name === "camryn"
            ? returnBold(props.dataC.length)
            : returnBold(props.dataK.length)}
        </div>
        <div>
          You {getPaymentAmountData.type} :
          {returnBold(
            `$${getPaymentAmountData.value.toFixed(2)}`,
            getPaymentAmountData.fill === "#008000"
              ? "#82ca9d"
              : getPaymentAmountData.fill
          )}
        </div>
        <div>
          You paid: {returnBold(`${getPaymentAmountData.percent.toFixed(2)} %`)}
          of the total {returnBold(`$${getPaymentAmountData.total.toFixed(2)}`)}
        </div>
      </div>
      <span style={styleCObj}>
        <PieChart
          width={300}
          height={300}
          margin={{ top: 25, right: 0, bottom: 0, left: 40 }}
        >
          <Pie
            data={getIntVals(props.dataC)}
            dataKey="CHARGE"
            nameKey="CHARGE"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#23395d"
            paddingAngle={1}
            minAngle={3}
            legendType={props.dataC.length > 0 ? "none" : "line"}
          />
          <Pie
            data={getPaymentAmount("c")}
            dataKey="value"
            nameKey="descr"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={70}
            label
          />
          <Legend />
          <Tooltip
            content={<CustomTooltip active={false} label={""} payload={[]} />}
          />
        </PieChart>
      </span>
      <span style={styleKObj}>
        <PieChart
          width={300}
          height={300}
          margin={{ top: 25, right: 0, bottom: 0, left: 40 }}
        >
          <Pie
            data={getIntVals(props.dataK)}
            dataKey="CHARGE"
            nameKey="CHARGE"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#23395d"
            paddingAngle={1}
            minAngle={3}
            legendType={props.dataK.length > 0 ? "none" : "line"}
          />
          <Pie
            data={getPaymentAmount("k")}
            dataKey="value"
            nameKey="descr"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={70}
            label
          />
          <Tooltip
            content={<CustomTooltip active={false} label={""} payload={[]} />}
          />
          <Legend />
        </PieChart>
      </span>
    </div>
  );
}

export default CombinedDisplay;
