// Packages/React
import React from "react";
import { ResponsiveContainer } from "recharts";
// Modularized scripts
import spliceDataBasedOnDate from "../algorithm/spliceDataBasedOnDate";
import rtnDataBasedOnName from "../algorithm/rtnDataBasedOnName";
import initialDate from "../algorithm/initialDate";
// Components
import Chart from "../components/Chart";
import DatePicker from "../components/DatePicker";
import InfoDisplay from "../components/InfoDisplay";
import Report from "../components/Report";
import Header from "../components/Header";

interface Parser {
  chargesOnly?: boolean;
  transferWithinAccountsRemoved?: boolean;
}

function AppView() {
  // States
  const [name, setName] = React.useState("Camryn");
  const [dates, setDates] = React.useState(initialDate);

  const namedData = (props: Parser): any[] => {
    // Order will matter here, first filter charges or it doesn't matter, then take out specific shit
    let allNamedData = spliceDataBasedOnDate(
      dates,
      rtnDataBasedOnName(name.toLowerCase())
    );
    if (props.chargesOnly) {
      allNamedData = allNamedData.filter((trans) => {
        if (trans.CHARGE) {
          return true;
        }
      });
    }
    if (props.transferWithinAccountsRemoved) {
      allNamedData = allNamedData.filter((trans) => {
        if (
          trans.DESCR.includes("Recurring Transfer to") ||
          trans.DESCR.includes("Online Transfer Ref") ||
          trans.DESCR.includes("Save As You Go Transfer Debit to")
        ) {
          return false;
        }
        return true;
      });
    }

    return allNamedData;
  };

  // Const event handlers
  const handleNameChange = () => {
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
      <Header name={name} onNameChange={handleNameChange} />
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
            <Chart
              dates={dates}
              data={namedData({
                chargesOnly: false,
                transferWithinAccountsRemoved: true,
              })}
            />
          </ResponsiveContainer>
          <InfoDisplay
            data={namedData({
              chargesOnly: true,
              transferWithinAccountsRemoved: true,
            })}
          />
        </div>
        <div className="chart-n-rep-child">
          <Report
            dates={dates}
            data={namedData({
              chargesOnly: true,
              transferWithinAccountsRemoved: true,
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default AppView;
