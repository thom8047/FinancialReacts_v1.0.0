import { ResponsiveContainer } from "recharts";
import parseData from "../algorithm/parse";
// import { Transaction } from "../types";
import Chart from "./Chart";
import React from "react";

const _data = [
  {
    TRANS_DATE: "Page A",
    uv: 4000,
    CHARGE: 2400,
    amt: 2400,
  },
  {
    TRANS_DATE: "Page B",
    uv: 3000,
    CHARGE: 1398,
    amt: 2210,
  },
  {
    TRANS_DATE: "Page C",
    uv: 2000,
    CHARGE: 9800,
    amt: 2290,
  },
  {
    TRANS_DATE: "Page D",
    uv: 2780,
    CHARGE: 3908,
    amt: 2000,
  },
  {
    TRANS_DATE: "Page E",
    uv: 1890,
    CHARGE: 4800,
    amt: 2181,
  },
  {
    TRANS_DATE: "Page F",
    uv: 2390,
    CHARGE: 3800,
    amt: 2500,
  },
  {
    TRANS_DATE: "Page G",
    uv: 3490,
    CHARGE: 4300,
    amt: 2100,
  },
];

function AppView() {
  const [data, setData] = React.useState(_data);
  const name: string = "Camryn";
  const handleEvent = (event: any) => {
    const cleanedData = parseData();
    setData(cleanedData.Statement0.transaction);
    // console.log(cleanedData.Statement0.transaction);
  };

  return (
    <div>
      <div className="App-header">
        <h1>WELCOME {name.toUpperCase()}!</h1>
      </div>
      <div>
        <button onClick={handleEvent}>TEST</button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data} />
      </ResponsiveContainer>
    </div>
  );
}

export default AppView;
