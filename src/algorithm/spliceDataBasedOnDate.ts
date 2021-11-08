import { DateTime } from "../types";
import _allData from "./rtnData";
import rtnDataBasedOnName from "./rtnDataBasedOnName";

function spliceDataBasedOnDate(
  dates: DateTime,
  namedData?: any[] | string
): any[] {
  let allData = namedData
    ? typeof namedData === "string"
      ? rtnDataBasedOnName(namedData)
      : namedData
    : _allData;

  const { fromMonth, fromYear, toMonth, toYear } = dates;
  let brokenData: any[] = allData.filter((transaction) => {
    const post_date = Date.parse(transaction.TRANS_DATE);
    const from_date = Date.parse(`${fromYear}/${fromMonth}`);
    const to_date = Date.parse(`${toYear}/${toMonth}`);
    if (post_date >= from_date && post_date < to_date) {
      return true;
    }
    return false;
  });

  return brokenData;
}

export default spliceDataBasedOnDate;
