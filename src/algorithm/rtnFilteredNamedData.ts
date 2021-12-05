import spliceDataBasedOnDate from "../algorithm/spliceDataBasedOnDate";
import rtnDataBasedOnName from "../algorithm/rtnDataBasedOnName";
import { DateTime } from "../types";

interface Parser {
  chargesOnly?: boolean;
  transferWithinAccountsRemoved?: boolean;
  name: string;
  dates: DateTime;
}

function rtnFilteredNamedData(props: Parser): any[] {
  // Order will matter here, first filter charges or it doesn't matter, then take out specific shit
  let allNamedData = spliceDataBasedOnDate(
    props.dates,
    rtnDataBasedOnName(props.name.toLowerCase())
  );
  if (props.chargesOnly) {
    allNamedData = allNamedData.filter((trans) => {
      if (trans.CHARGE) {
        return true;
      }
      return false;
    });
  }
  if (props.transferWithinAccountsRemoved) {
    allNamedData = allNamedData.filter((trans) => {
      if (
        /* We want to exclude all our money movement between personal accounts */
        trans.DESCR.includes("Recurring Transfer to") ||
        trans.DESCR.includes("Online Transfer Ref") ||
        trans.DESCR.includes("Save As You Go Transfer Debit to") ||
        trans.DESCR.includes("Online Transfer to")
      ) {
        return false;
      }
      return true;
    });
  }

  return allNamedData;
}

export default rtnFilteredNamedData;
