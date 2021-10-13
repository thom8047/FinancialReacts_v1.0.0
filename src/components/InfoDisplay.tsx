import "../styles/Display.css";
import React from "react";
import { Transaction } from "../types";

interface Props {
  data: Transaction[];
}

function InfoDisplay(props: Props): any {
  const [sum, setSum] = React.useState(0);
  React.useEffect(() => {
    console.log(sum);
  });

  const callBack = (): JSX.Element[] => {
    let chargeList: JSX.Element[] = [];
    props.data.forEach((value: Transaction, index: number) => {
      const handleClick = () => {
        var ele = [
          document.getElementById(`Tag${index}`),
          document.getElementById(`Descr${index}`),
        ];
        var int = parseFloat(value.CHARGE);
        if (ele[0] && ele[1]) {
          if (ele[1].style.color === "rgb(255, 127, 127)") {
            int *= -1;
            ele[0].style.color = "#fff";
            ele[1].style.color = "#fff";
          } else {
            ele[0].style.color = "#ff7f7f";
            ele[1].style.color = "#ff7f7f";
          }
        }
        setSum(parseFloat((sum + int).toFixed(2)));
      };
      chargeList.push(
        <div key={value.REF_ID}>
          <span className="priceTag" id={"Tag" + index} onClick={handleClick}>
            {value.CHARGE}
          </span>
          <span
            className="priceDescr"
            id={"Descr" + index}
            onClick={handleClick}
          >
            {value.DESCR}
          </span>
        </div>
      );
    });

    return chargeList;
  };
  return (
    <div className="display">
      <div className="priceInfo">{callBack()}</div>
    </div>
  );
}

export default InfoDisplay;
