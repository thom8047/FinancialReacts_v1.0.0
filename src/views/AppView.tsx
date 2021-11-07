import { ResponsiveContainer } from "recharts";
// import allData from "../algorithm/rtnData";
import spliceDataBasedOnDate from "../algorithm/spliceDataBasedOnDate";
import initialDate from "../algorithm/initialDate";
// import { DateTime } from "../types";
import Chart from "../components/Chart";
import DatePicker from "../components/DatePicker";
import InfoDisplay from "../components/InfoDisplay";
import React from "react";

function AppView() {
  // States
  // const [currentTrans, setCurrentTrans] = React.useState({ test: "test" });
  const [name, setName] = React.useState("Camryn");
  const [dates, setDates] = React.useState(initialDate);

  /*   React.useEffect(() => {
    console.log(dates);
  }, [dates]); */

  // Const variables that are based on data to be displayed
  const totalExp = () => {
    let sum: number = 0;
    for (let trans of spliceDataBasedOnDate(dates)) {
      sum += parseFloat(trans.CHARGE);
    }
    return sum.toFixed(2);
  };
  const returnBold = (inner: string | number) => (
    <b className="report-bold">{inner}</b>
  );

  // Const event handlers
  const handleEvent = (event: any) => {
    setName(() => (name === "Camryn" ? "Kyle" : "Camryn"));
  };
  const handleDateChange = (text: string, value: string) => {
    if (text === "f") {
      let [m, y] = value.split("/");
      setDates((oldDates) => ({
        ...oldDates,
        fromMonth: parseInt(m),
        fromYear: parseInt(y),
      }));
    } else if (text === "t") {
      let [m, y] = value.split("/");
      setDates((oldDates) => ({
        ...oldDates,
        toMonth: parseInt(m),
        toYear: parseInt(y),
      }));
    }
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
            text={"f"}
            defaultValue={`${dates.fromYear}/${dates.fromMonth}`}
            onDateChange={handleDateChange}
          />,
          <DatePicker
            key={"to"}
            text={"t"}
            defaultValue={`${dates.toYear}/${dates.toMonth}`}
            onDateChange={handleDateChange}
          />,
        ]}
      </div>
      <div className="App-chart-n-rep-parent">
        <div className="chart-n-rep-child">
          <ResponsiveContainer width="50%" height="100%">
            <Chart dates={dates} />
          </ResponsiveContainer>
          <InfoDisplay data={spliceDataBasedOnDate(dates)} />
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
