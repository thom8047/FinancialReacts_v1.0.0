import { PieChart, Pie } from "recharts";
import "../styles/Display.css";
import React from "react";

interface Props {
  name: string;
  data: any[];
}
interface Person {
  camryn: number;
  kyle: number;
}

function CombinedDisplay(props: Props) {
  const getIntVals = () => {
    return props.data.map((trans) => {
      trans.CHARGE = parseFloat(trans.CHARGE);
      return trans;
    });
  };

  if (props.data) {
    console.log(true);
  }

  return (
    <div className="combinedDataDisplay">
      <div style={{ width: "50%", float: "left", marginTop: "-10px" }}>
        <PieChart
          width={300}
          height={300}
          margin={{ top: 25, right: 0, bottom: 0, left: 50 }}
        >
          <Pie
            data={getIntVals()}
            dataKey="CHARGE"
            cx="50%"
            cy="50%"
            outerRadius={30}
            fill="#8884d8"
            label
          />
          <Pie
            data={eachPerson}
            dataKey="camryn"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            fill="#82ca9d"
          />
        </PieChart>
      </div>
      <div style={{ width: "50%", float: "left", marginTop: "-10px" }}>
        <PieChart
          width={300}
          height={300}
          margin={{ top: 25, right: 0, bottom: 0, left: 50 }}
        >
          <Pie
            data={getIntVals()}
            dataKey="CHARGE"
            cx="50%"
            cy="50%"
            outerRadius={30}
            fill="#8884d8"
            label
          />
          <Pie
            data={eachPerson}
            dataKey="camryn"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            fill="#82ca9d"
          />
        </PieChart>
      </div>
    </div>
  );
}

export default CombinedDisplay;
