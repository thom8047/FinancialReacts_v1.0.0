// Packages/React
import React from "react";
import { ResponsiveContainer } from "recharts";
// Modularized scripts
import initialDate from "../algorithm/initialDate";
import rtnFilteredNamedData from "../algorithm/rtnFilteredNamedData";
// Components
import Chart from "../components/Chart";
import DatePicker from "../components/DatePicker";
import InfoDisplay from "../components/InfoDisplay";
import Report from "../components/Report";
import Header from "../components/Header";
import CombinedDisplay from "../components/CombinedDisplay";

function AppView() {
  // States
  const [name, setName] = React.useState("Camryn");
  const [dates, setDates] = React.useState(initialDate);
  const [getKyleData, setKyleData] = React.useState<any[]>([]);
  const [getCamData, setCamData] = React.useState<any[]>([]);

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
              dataOffset={0}
              data={rtnFilteredNamedData({
                chargesOnly: false,
                transferWithinAccountsRemoved: true,
                name: name.toLowerCase(),
                dates: dates,
              })}
            />
          </ResponsiveContainer>
          <InfoDisplay
            key={name.toLowerCase()}
            data={rtnFilteredNamedData({
              chargesOnly: true,
              transferWithinAccountsRemoved: true,
              name: name.toLowerCase(),
              dates: dates,
            })}
            selected={name.toLowerCase() === "kyle" ? getKyleData : getCamData}
            setIndividualData={(data) => {
              name.toLowerCase() === "kyle"
                ? setKyleData(data)
                : setCamData(data);
            }}
          />
          <ResponsiveContainer>
            <CombinedDisplay
              name={name.toLowerCase()}
              dataK={getKyleData}
              dataC={getCamData}
            />
          </ResponsiveContainer>
        </div>
        <div className="chart-n-rep-child">
          <Report
            dates={dates}
            data={rtnFilteredNamedData({
              chargesOnly: true,
              transferWithinAccountsRemoved: true,
              name: name.toLowerCase(),
              dates: dates,
            })}
            name={name.toLowerCase()}
          />
        </div>
      </div>
    </div>
  );
}

export default AppView;
