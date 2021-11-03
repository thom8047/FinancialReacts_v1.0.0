import "../styles/Display.css";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  data: any[];
  setCurrentSelection: Dispatch<SetStateAction<number>>;
}

function InfoDisplay(props: Props): any {
  const [sum, setSum] = React.useState(0);
  const [data, setData] = React.useState(Array.from(props.data));
  const handleClearClick = () => {
    setSum(0);
    data.forEach((value: any, index: number) => {
      var ele = [
        document.getElementById(`Tag${index}`),
        document.getElementById(`Descr${index}`),
      ] as HTMLElement[];
      if (ele[0] && ele[1]) {
        ele[0].setAttribute("data-selected", "false");
        ele[0].style.color = "#fff";
        ele[1].setAttribute("data-selected", "false");
        ele[1].style.color = "#fff";
      }
    });
  };

  // eslint-disable-next-line
  const clear = React.useCallback(handleClearClick, []);

  React.useEffect(() => {
    // When props.data changes, keep shit updated, changing the key only updates our css
    setData(props.data);
    clear();
  }, [props.data, clear]);

  const listOfNames: string[] = ["All", "KING SOOPERS", "FUEL", "WINE", "AMZN"];

  const getDataObj = (): JSX.Element => {
    let chargeList: JSX.Element[] = [];
    data.forEach((value: any, index: number) => {
      const handleHoverIn = () => {
        // props.setCurrentSelection(index);
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
        props.setCurrentSelection(-1);
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
          <div id="tabs-parent" className="priceInfo-Tabs">
            {listOfNames.map((value: string) => {
              let className = "tabs";
              if (value === "All") {
                className += "-selected";
              }

              const handleTabChange = () => {
                setSum(0);
                handleClearClick();
                const parent = document.getElementById(
                  "tabs-parent"
                ) as HTMLElement;
                for (let i = 0; i < parent.children.length; i++) {
                  parent.children[i].setAttribute("class", "tabs");
                }
                const self = document.getElementById(value);
                self?.setAttribute("class", "tabs-selected");
                if (value === "All") {
                  setData(props.data);
                } else {
                  setData(
                    props.data.filter((trans: any) =>
                      trans.DESCR.toLowerCase().includes(value.toLowerCase())
                    )
                  );
                }
              };
              return (
                <span
                  key={`${value}${props.data.length}`}
                  className={className}
                  id={value}
                  onClick={handleTabChange}
                >
                  {value}
                </span>
              );
            })}
          </div>
          <div className="priceInfo">{chargeList}</div>
        </div>
        <div className="priceSum">
          SUM: <span>{sum}</span>
          <span className="clearState" onClick={handleClearClick}>
            CLEAR
          </span>
        </div>

        <div className="combinedDataDisplay">
          Combined data:
          <div>Camryn</div>
          <div style={{ float: "right" }}>Kyle</div>
        </div>
      </div>
    );
  };

  return getDataObj();
}

export default InfoDisplay;
