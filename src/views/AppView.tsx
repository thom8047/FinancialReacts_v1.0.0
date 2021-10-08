import parseData from "../algorithm/parse";
import { Transaction } from "../types";
import React from "react";

function AppView() {
  const name: string = "Camryn";
  const data: Transaction = {
    date: "08/10",
    amount: "100.00",
  };

  const handleEvent = (event: any) => {
    const cleanedData = parseData(data);
    console.log(cleanedData);
  };

  return (
    <div>
      <div className="App-header">
        <h1>WELCOME {name.toUpperCase()}!</h1>
      </div>
      <div>
        <button onClick={handleEvent}>TEST</button>
      </div>
    </div>
  );
}

export default AppView;
