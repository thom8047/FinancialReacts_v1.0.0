import { ResponsiveContainer } from "recharts";
import parseData from "../algorithm/parse";
// import { Transaction } from "../types";
import Chart from "./Chart";
import React from "react";

const _data = parseData();

function AppView() {
  const [data, setData] = React.useState(_data.Statement0.transaction);
  const name: string = "Camryn";
  const handleEvent = (event: any) => {
    setData(data.concat(_data.Statement1.transaction));
    // console.log(cleanedData.Statement0.transaction);
  };

  return (
    <div>
      <div className="App-header">
        <h1>WELCOME {name.toUpperCase()}!</h1>
      </div>
      {/* This will be the bar under the app header to display from to and anything else */}
      <div>
        <button onClick={handleEvent}>TEST</button>
      </div>
      {/* MOVE CSS TO STYLES SHEET */}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="50%" height="100%">
            <Chart data={data} />
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1 }}>Hello</div>
      </div>
    </div>
  );
}

export default AppView;
