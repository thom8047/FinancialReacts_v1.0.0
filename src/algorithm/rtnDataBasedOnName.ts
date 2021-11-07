import parseData from "./parse";
import who from "./python_modules/who.json";

let parsedData: any = parseData();
let allData: any[] = [];

const parsedWho = JSON.parse(JSON.stringify(who));

console.log(parsedWho["camryn"]);

function rtnData(name: string): any[] {
  Object.entries(parsedData).forEach(([k, v]) => {
    if (parsedWho[name].includes(parsedData[k].ACCOUNTNUMBER)) {
      allData = allData.concat(parsedData[k].transaction);
    }
  });

  return allData;
}

export default rtnData;
