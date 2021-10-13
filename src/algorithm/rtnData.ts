import parseData from "./parse";

let parsedData: any = parseData();
let allData: any[] = [];

Object.entries(parsedData).forEach(([k, v]) => {
  allData = allData.concat(parsedData[k].transaction);
});

export default allData;
