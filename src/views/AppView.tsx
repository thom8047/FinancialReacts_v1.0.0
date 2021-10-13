import { ResponsiveContainer } from "recharts";
import allData from "../algorithm/rtnData";
import { DateTime } from "../types";
import Chart from "../components/Chart";
import DatePicker from "../components/DatePicker";
import React from "react";

const initDate = () => {
  const current = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
    })
    .split("/");
  const prevMonth =
    parseInt(current[0]) - 1 < 1 ? 12 : parseInt(current[0]) - 1;

  return {
    fromMonth: prevMonth,
    toMonth: parseInt(current[0]),
    year: parseInt(current[1]),
  } as DateTime;
};

function AppView() {
  // States
  /* const [data, setData] = React.useState(allData); */
  const [name, setName] = React.useState("Camryn");
  const [dates, setDates] = React.useState(initDate());

  React.useEffect(() => {
    console.log("change");
  });

  // Const variables that are based on data to be displayed
  const totalExp = () => {
    let sum: number = 0;
    for (let trans of handleDataChange()) {
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

  // Const event handlers
  const handleEvent = (event: any) => {
    setName(() => (name === "Camryn" ? "Kyle" : "Camryn"));
  };
  const handleDataChange = (): any[] => {
    const { fromMonth, toMonth, year } = dates;

    let brokenData: any[] = [];
    allData.forEach((transaction, index) => {
      const post_date = Date.parse(transaction.POST_DATE);
      const from_date = Date.parse(`${year}/${fromMonth}`);
      const to_date =
        toMonth + 1 > 12
          ? Date.parse(`${year + 1}/1`)
          : Date.parse(`${year}/${toMonth}`);
      if (post_date > from_date && post_date < to_date) {
        brokenData.push(transaction);
      }
    });

    return brokenData;
  };
  const handleDateChange = (text: string, value: string) => {
    let nextState: DateTime = {
      fromMonth: dates.fromMonth,
      toMonth: dates.toMonth,
      year: dates.year,
    };
    if (text === "FROM: ") {
      nextState.fromMonth = parseInt(value);
    } else if (text === "TO: ") {
      nextState.toMonth = parseInt(value);
    } else if (text === "YEAR: ") {
      nextState.year = parseInt(value);
    }

    setDates(nextState);
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
        {[
          <DatePicker
            key={"from"}
            text={"FROM: "}
            date_type={0}
            defaultValue={dates.fromMonth}
            onDateChange={handleDateChange}
          />,
          <DatePicker
            key={"to"}
            text={"TO: "}
            date_type={0}
            defaultValue={dates.toMonth}
            onDateChange={handleDateChange}
          />,
          <DatePicker
            key={"year"}
            text={"YEAR: "}
            date_type={1}
            defaultValue={dates.year}
            onDateChange={handleDateChange}
          />,
        ]}
      </div>
      <div className="App-chart-n-rep-parent">
        <div className="chart-n-rep-child">
          <ResponsiveContainer width="50%" height="100%">
            <Chart data={handleDataChange()} />
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
