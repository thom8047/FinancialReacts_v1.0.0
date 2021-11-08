import { PieChart, Pie } from "recharts";
import "../styles/Display.css";
import React from "react";

interface Props {
  name: string;
  data: any[];
}

function CombinedDisplay(props: Props) {
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  return (
    <div className="combinedDataDisplay">
      <div style={{ width: "50%", float: "left" }}>
        <PieChart width={200} height={200}>
          <Pie
            data={props.data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={30}
            fill="#8884d8"
          />
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <PieChart width={200} height={200}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={30}
            fill="#8884d8"
          />
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </div>
    </div>
  );
}

export default CombinedDisplay;
