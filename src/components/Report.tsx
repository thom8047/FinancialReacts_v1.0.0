import React from "react";
import spliceDataBasedOnDate from "../algorithm/spliceDataBasedOnDate";
import { DateTime } from "../types";

interface Props {
  dates: DateTime;
  data: any[];
}

function Report(props: Props) {
  // Const variables that are based on data to be displayed
  const totalExp = (obj: any[]) => {
    let sum: number = 0;
    for (let trans of obj) {
      sum += parseFloat(trans.CHARGE);
    }
    return sum.toFixed(2);
  };
  const getLargestPurchase = (): number => {
    let max: number = 0;
    for (let trans of props.data) {
      if (parseFloat(trans.CHARGE) > max) {
        max = parseFloat(parseFloat(trans.CHARGE).toFixed(2));
      }
    }

    return max;
  };
  const getPercentage = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const fM = props.dates.fromMonth - 1 === 0 ? 12 : props.dates.fromMonth - 1,
      fY = fM === 12 ? props.dates.fromYear - 1 : props.dates.fromYear;
    const prevMonthExpData = spliceDataBasedOnDate({
      fromYear: fY,
      fromMonth: fM,
      toYear: props.dates.fromYear,
      toMonth: props.dates.fromMonth,
    });
    let prevMonthExp: number = parseFloat(totalExp(prevMonthExpData)),
      monthExp: number = parseFloat(totalExp(props.data)),
      percent: string | number = ((prevMonthExp - monthExp) / monthExp) * 100,
      direction: string = "Increase";

    if (percent > 0) {
      percent = percent.toFixed(0);
    } else {
      // switch em
      console.log("decr");
      direction = "Decrease";
      percent = (((monthExp - prevMonthExp) / monthExp) * 100).toFixed(0);
    }

    return (
      <div>
        {direction} in spending from {months[fM - 1]} to{" "}
        {months[props.dates.fromMonth - 1]} by {returnBold(`${percent}%`)}
      </div>
    );
  };
  const returnBold = (inner: string | number) => (
    <b className="report-bold">{inner}</b>
  );

  return (
    <div className="report">
      <div className="report-child">
        Overall monthly expenses:
        {returnBold("$" + totalExp(props.data))}
      </div>
      <div className="report-child">
        {Math.abs(props.dates.toMonth - props.dates.fromMonth) === 1 ||
        Math.abs(props.dates.toMonth - props.dates.fromMonth) === 11
          ? getPercentage()
          : "Only monthly analysis available."}
        {/* Change to show monthly averages of payments */}
      </div>
      <div className="report-child">
        Largest expense of the period: {returnBold("$" + getLargestPurchase())}
      </div>
      <div className="report-child">
        Savings: {returnBold("**")}No savings data currently available
        {returnBold("**")}
      </div>
    </div>
  );
}

export default Report;
