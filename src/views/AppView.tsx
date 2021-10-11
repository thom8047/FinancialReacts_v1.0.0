import { ResponsiveContainer } from "recharts";
import parseData from "../algorithm/parse";
// import { Transaction } from "../types";
import Chart from "./Chart";
import React from "react";

let parsedData: any = parseData();
let allData: any[] = [];

Object.entries(parsedData).forEach(([k, v]) => {
  allData = allData.concat(parsedData[k].transaction);
});

function AppView() {
  // States
  const [data, setData] = React.useState(allData);
  const [name, setName] = React.useState("Camryn");

  // Const variables that are based on data to be displayed
  const totalExp = () => {
    let sum: number = 0;
    for (let trans of data) {
      sum += parseFloat(trans.CHARGE);
    }
    return sum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const returnBold = (inner: string | number) => (
    <b className="report-bold">{inner}</b>
  );

  // Comst event handlers
  const handleEvent = (event: any) => {
    setName(() => (name === "Camryn" ? "Kyle" : "Camryn"));
  };

  return (
    <div>
      <div className="App-header">
        <h1>WELCOME {name.toUpperCase()}!</h1>
        <button className="change-user-btn" onClick={handleEvent}>
          CHANGE USER
        </button>
      </div>
      {/* This will be the bar under the app header to display from to and anything else */}
      <div className="navbar">
        <span>FROM: </span>
        <span>TO: </span>
      </div>
      <div className="App-chart-n-rep-parent">
        <div className="chart-n-rep-child">
          <ResponsiveContainer width="50%" height="100%">
            <Chart data={data} />
          </ResponsiveContainer>
        </div>
        <div className="chart-n-rep-child">
          <div className="report">
            <div className="report-child">
              Overall monthly expenses:
              {returnBold("$" + totalExp())}
            </div>
            <div className="report-child">
              Increase in spending from prev month by __%
            </div>
            <div className="report-child">Largest expense of the month: </div>
            <div className="report-child">Savings: </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppView;
