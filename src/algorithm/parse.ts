import transactions from "../algorithm/python_modules/transaction.json";
// import * as child from "child_process";
// Probably won't need to use this package, because I'll just run the python script, but might as well keep it

interface Transaction {
  date: string;
  amount: string;
}

function parseData(prop: Transaction) {
  let parsedData = JSON.parse(JSON.stringify(transactions));

  /* DO ANYTHING TO THE DATA HERE, such as removing or changing data. 
    Remove transaction_data object 
   */

  return parsedData;
}

export default parseData;
