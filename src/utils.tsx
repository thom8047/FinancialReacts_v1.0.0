/**
 * Removes text and returns. Parameterize this function to accept a
 * list of strings to remove. That way we can pass in 1 or more phrases to remove
 * based on context.
 *
 * @param text
 * @returns string
 */

const rmvExtraText = (text: string): string => {
  let extras: string[] = ["Purchase authorized on", "INCOME "];
  extras.forEach((searchValue: string) => {
    text = text.replace(searchValue, "");
  });

  return text;
};

/**
 * Parses Date object into a MM/DD/YYYY format
 *
 * @param date
 * @returns string
 */
const getReadableDateFromDateObj = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

/**
 * Created a <b>old HTMLElement with the textContent given. The color can also be adjusted.
 *
 * @param inner
 * @param color
 * @returns HTMLElement
 */
const returnBold = (inner: string | number, color?: string) => (
  <b className="report-bold" style={color ? { color: color } : {}}>
    {inner}
  </b>
);

/**
 * Return largest amount based on how our data is being read. > [{...trans.CHARGE, trans.DESCR, trans.TRANS_DATE}]
 *
 * @param data
 * @param offset
 * @returns number
 */
const getLargestPurchase = (data: any[], offset: number = 0): number => {
  let max: number = 0;
  for (let trans of data) {
    if (parseFloat(trans.CHARGE) > max) {
      max = parseFloat((parseFloat(trans.CHARGE) + offset).toFixed(2));
    }
  }

  return max;
};

/**
 *
 * Function to parseFloat() and toFixed(2)
 *
 * return adjusted float
 */
const float = (int: number | string): number => {
  return typeof int === "string"
    ? parseFloat(parseFloat(int).toFixed(2))
    : parseFloat(int.toFixed(2));
};

export {
  rmvExtraText,
  getReadableDateFromDateObj,
  returnBold,
  getLargestPurchase,
  float,
};
