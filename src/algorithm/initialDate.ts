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
  const prevYear =
    parseInt(current[0]) - 1 < 1
      ? parseInt(current[1]) - 1
      : parseInt(current[1]);

  return {
    fromMonth: prevMonth,
    fromYear: prevYear,
    toMonth: parseInt(current[0]),
    toYear: parseInt(current[1]),
  } as DateTime;
}

export default initialDate;
