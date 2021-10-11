import transactions from "../algorithm/python_modules/transaction.json";
import isEqual from "lodash";
// import * as child from "child_process";
// Probably won't need to use this package, because I'll just run the python script, but might as well keep its

interface Sorted {
  date: Date;
  key: string;
}

function parseData() {
  let parsedData: any = JSON.parse(JSON.stringify(transactions));

  delete parsedData.transaction_data;

  /* DO ANYTHING TO THE DATA HERE, such as removing or changing data. 
    Remove transaction_data object 
    
    Let's sort data here
   */
  const getDate = (date: string) => {
    const [month, day, year] = date.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  const sortData = () => {
    let sortedData: any = {};

    let info: Sorted = {
      date: new Date(),
      key: "",
    };

    let parsedDataKeys: string[] = Object.keys(parsedData);
    let parsedDataLength = Object.keys(parsedData).length;

    // This doesn't matter if it's the objects. We only want to iterate through the entire object, so we can use a for loop that's the length of the object
    Object.entries(parsedData).forEach(([k, v]) => {
      for (let loops = 0; loops < parsedDataLength; loops++) {
        const key = parsedDataKeys[loops];
        const objDate = getDate(parsedData[key].FROM);
        if (objDate <= info.date) {
          info.date = objDate;
          info.key = key;
        }
      }
      // Get smallest date and put it in sortedData then remove from parsed
      sortedData[info.key] = parsedData[info.key];
      parsedDataLength--;
      parsedDataKeys.splice(parsedDataKeys.indexOf(info.key), 1);

      // reset date
      info.date = new Date();
    });

    return sortedData;
  };

  // Just to see if any sort method could work
  const sortedData = sortData();

  return sortedData;
}

export default parseData;
