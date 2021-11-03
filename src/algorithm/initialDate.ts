import { DateTime } from "../types";

function initialDate(): DateTime {
  const current = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
    })
    .split("/");
  const prevMonth =
    parseInt(current[0]) - 1 < 1 ? 12 : parseInt(current[0]) - 1;

  return {
    fromMonth: prevMonth,
    toMonth: parseInt(current[0]),
    year: parseInt(current[1]),
  } as DateTime;
}

export default initialDate;
