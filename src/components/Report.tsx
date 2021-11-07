import React from "react";
import spliceDataBasedOnDate from "../algorithm/spliceDataBasedOnDate";
import { DateTime } from "../types";

interface Props {
  dates: DateTime;
}

// Const variables that are based on data to be displayed
const totalExp = (dates: DateTime) => {
  let sum: number = 0;
  for (let trans of spliceDataBasedOnDate(dates)) {
    sum += parseFloat(trans.CHARGE);
  }
  return sum.toFixed(2);
};
const returnBold = (inner: string | number) => (
  <b className="report-bold">{inner}</b>
);

function Report(props: Props) {
  return (
    <div className="report">
      <div className="report-child">
        Overall monthly expenses:
        {returnBold("$" + totalExp(props.dates))}
      </div>
      <div className="report-child">
        Increase in spending from prev month by __%
      </div>
      <div className="report-child">Largest expense of the month: </div>
      <div className="report-child">Savings: </div>
    </div>
  );
}

export default Report;
