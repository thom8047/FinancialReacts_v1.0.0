import React from "react";
import rtnFilteredNamedData from "../algorithm/rtnFilteredNamedData";
import { DateTime } from "../types";
import { returnBold, getLargestPurchase } from "../utils";

interface Props {
  dates: DateTime;
  data: any[];
  name: string;
}

function Report(props: Props) {
  // Const variables that are based on data to be displayed
  const totalExp = (obj: any[]) => {
    let sum: number = 0;
    for (let trans of obj) {
      if (trans.CHARGE) {
        sum += parseFloat(trans.CHARGE);
      }
    }
    return sum.toFixed(2);
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

    const prevMonthExpData = rtnFilteredNamedData({
      chargesOnly: true,
      transferWithinAccountsRemoved: true,
      name: props.name,
      dates: {
        fromYear: fY,
        fromMonth: fM,
        toYear: props.dates.fromYear,
        toMonth: props.dates.fromMonth,
      },
    });
    let prevMonthExp: number = parseFloat(totalExp(prevMonthExpData)),
      monthExp: number = parseFloat(totalExp(props.data)),
      percent: string | number = (monthExp / prevMonthExp - 1) * 100,
      direction: string = "Increase";

    if (percent >= 1) {
      percent = percent.toFixed(2);
    } else {
      direction = "Decrease";
      percent = percent.toFixed(2);
    }

    return (
      <div>
        {direction} in spending from {months[fM - 1]} to{" "}
        {months[props.dates.fromMonth - 1]} by {returnBold(`${percent}%`)}
      </div>
    );
  };

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
        Largest expense of the period:{" "}
        {returnBold("$" + getLargestPurchase(props.data))}
      </div>
      <div className="report-child">
        Savings: {returnBold("**")}No savings data currently available
        {returnBold("**")}
      </div>
    </div>
  );
}

export default Report;
