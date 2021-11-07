import { DateTime } from "../types";
import _allData from "./rtnData";

function spliceDataBasedOnDate(dates: DateTime, namedData?: any[]): any[] {
  const allData = namedData ? namedData : _allData;

  const { fromMonth, fromYear, toMonth, toYear } = dates;
  let brokenData: any[] = [];
  allData.forEach((transaction) => {
    const post_date = Date.parse(transaction.TRANS_DATE);
    const from_date = Date.parse(`${fromYear}/${fromMonth}`);
    const to_date = Date.parse(`${toYear}/${toMonth}`);
    if (post_date >= from_date && post_date <= to_date) {
      brokenData.push(transaction);
    }
  });

  return brokenData;
}

export default spliceDataBasedOnDate;
