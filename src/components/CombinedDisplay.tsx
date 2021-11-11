import { PieChart, Pie } from "recharts";
import "../styles/Display.css";
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
    console.log(`C has paid: ${c} | K has paid ${k}`);
    const each = parseFloat(((c + k) / 2).toFixed(2));
    const paidK = parseFloat((each - k).toFixed(2));
    const paidC = parseFloat((each - c).toFixed(2));
    return who === "c"
      ? [
          {
            descr: "Total of what each owes",
            value: c,
            fill: "#AEBCC4",
          },
          {
            descr: "Paid",
            value: Math.abs(paidC),
            fill: paidC > 0 ? "	#FF0000" : "#008000",
          },
        ]
      : [
          {
            descr: "Total of what each owes",
            value: k,
            fill: "#AEBCC4",
          },
          {
            descr: "Paid",
            value: Math.abs(paidK),
            fill: paidK > 0 ? "#FF0000" : "#008000",
          },
        ];
  };

  return (
    <div className="combinedDataDisplay">
      <div style={{ width: "50%", float: "left", marginTop: "-10px" }}>
        <PieChart
          width={300}
          height={300}
          margin={{ top: 25, right: 0, bottom: 0, left: 40 }}
        >
          <Pie
            data={getIntVals(props.dataC)}
            dataKey="CHARGE"
            cx="50%"
            cy="50%"
            outerRadius={props.name === "kyle" ? 30 : 60}
            fill="#23395d"
          />
          <Pie
            data={getPaymentAmount("c")}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={props.name === "kyle" ? 50 : 80}
            innerRadius={props.name === "kyle" ? 40 : 70}
            label
          />
        </PieChart>
      </div>
      <div style={{ width: "50%", float: "left", marginTop: "-10px" }}>
        <PieChart
          width={300}
          height={300}
          margin={{ top: 25, right: 0, bottom: 0, left: 40 }}
        >
          <Pie
            data={getIntVals(props.dataK)}
            dataKey="CHARGE"
            cx="50%"
            cy="50%"
            outerRadius={props.name === "kyle" ? 60 : 30}
            fill="#23395d"
          />
          <Pie
            data={getPaymentAmount("k")}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={props.name === "kyle" ? 80 : 50}
            innerRadius={props.name === "kyle" ? 70 : 40}
            label
          />
        </PieChart>
      </div>
    </div>
  );
}

export default CombinedDisplay;
