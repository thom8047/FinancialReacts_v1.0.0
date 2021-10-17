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

  const handleClearClick = () => {
    setSum(0);
    props.data.forEach((value: Transaction, index: number) => {
      var ele = [
        document.getElementById(`Tag${index}`),
        document.getElementById(`Descr${index}`),
      ] as HTMLElement[];
      ele[0].setAttribute("data-selected", "false");
      ele[0].style.color = "#fff";
      ele[1].setAttribute("data-selected", "false");
      ele[1].style.color = "#fff";
    });
  };

  const getDataObj = (): JSX.Element => {
    let chargeList: JSX.Element[] = [];
    props.data.forEach((value: Transaction, index: number) => {
      const handleHoverIn = () => {
        var ele = [
          document.getElementById(`Tag${index}`),
          document.getElementById(`Descr${index}`),
        ] as HTMLElement[];
        if (ele[0].getAttribute("data-selected") === "false") {
          ele[0].style.color = "#ff7f7f";
          ele[1].style.color = "#ff7f7f";
        }
      };
      const handleHoverOut = () => {
        var ele = [
          document.getElementById(`Tag${index}`),
          document.getElementById(`Descr${index}`),
        ] as HTMLElement[];
        if (ele[0].getAttribute("data-selected") === "false") {
          ele[0].style.color = "#fff";
          ele[1].style.color = "#fff";
        }
      };
      const handleClick = () => {
        var ele = [
          document.getElementById(`Tag${index}`),
          document.getElementById(`Descr${index}`),
        ] as HTMLElement[];
        var int = parseFloat(value.CHARGE);
        if (ele[0].getAttribute("data-selected") === "true") {
          int *= -1;
          ele[0].setAttribute("data-selected", "false");
          ele[1].setAttribute("data-selected", "false");
          ele[0].style.color = "#fff";
          ele[1].style.color = "#fff";
        } else {
          ele[0].setAttribute("data-selected", "true");
          ele[1].setAttribute("data-selected", "true");
          ele[0].style.color = "#ff7f7f";
          ele[1].style.color = "#ff7f7f";
        }
        setSum(parseFloat((sum + int).toFixed(2)));
      };
      chargeList.push(
        <div key={value.REF_ID}>
          <span
            className="priceTag"
            id={"Tag" + index}
            onClick={handleClick}
            data-selected={false}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            {value.CHARGE}
          </span>
          <span
            className="priceDescr"
            id={"Descr" + index}
            onClick={handleClick}
            data-selected={false}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            {value.DESCR}
          </span>
        </div>
      );
    });

    return (
      <div>
        <div className="display">
          <div className="priceInfo">{chargeList}</div>
        </div>
        <div className="priceSum">
          SUM: <span>{sum}</span>
          <span className="clearState" onClick={handleClearClick}>
            CLEAR
          </span>
        </div>
      </div>
    );
  };

  return getDataObj();
}

export default InfoDisplay;
