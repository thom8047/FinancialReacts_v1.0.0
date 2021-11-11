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

  return (
    <div className="combinedDataDisplay">
      <div className="description-title">{props.name}</div>
      <div className="description-text">
        <div>
          Number of charges:
          {props.name === "camryn" ? props.dataC.length : props.dataK.length}
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
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#23395d"
          />
          <Pie
            data={getPaymentAmount("c")}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={70}
            label
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
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#23395d"
          />
          <Pie
            data={getPaymentAmount("k")}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={70}
            label
          />
        </PieChart>
      </span>
    </div>
  );
}

export default CombinedDisplay;
