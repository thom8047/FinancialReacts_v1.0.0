import { DateTime } from "../types";
import allData from "./rtnData";

function spliceDataBasedOnDate(dates: DateTime): any[] {
  const { fromMonth, toMonth, year } = dates;
  let brokenData: any[] = [];
  allData.forEach((transaction) => {
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
}

export default spliceDataBasedOnDate;
