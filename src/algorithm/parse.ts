import transactions from "../algorithm/python_modules/transaction.json";
// import * as child from "child_process";
// Probably won't need to use this package, because I'll just run the python script, but might as well keep its

function parseData() {
  let parsedData = JSON.parse(JSON.stringify(transactions));

  /* DO ANYTHING TO THE DATA HERE, such as removing or changing data. 
    Remove transaction_data object 
   */
  delete parsedData.transaction_data;

  return parsedData;
}

export default parseData;
