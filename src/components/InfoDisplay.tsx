import "../styles/Display.css";
import { rmvExtraText } from "../utils";
import React from "react";

interface Props {
  data: any[];
  selected: any[];
  setIndividualData: (data: any[]) => void;
}

const sumOfTrans = (list: any[]): number => {
  let total: number = 0;
  list.forEach((trans: any) => {
    if (trans.CHARGE) {
      total += parseFloat(trans.CHARGE);
    }
  });

  return total;
};

function InfoDisplay(props: Props): any {
  const [data, setData] = React.useState(Array.from(props.data));
  const [sum, setSum] = React.useState(sumOfTrans(props.selected));
  const [getSelectedItems, setSelectedItems] = React.useState<any[]>(
    props.selected
  );
  const [tabState, setTabState] = React.useState<string>("All");
  const listOfNames: string[] = ["All", "KING SOOPERS", "FUEL", "WINE", "AMZN"];

  const handleClearClick = (_data: any[]) => {
    let specificSum: number = 0,
      specificValues: any[] = [];
    _data.forEach((value: any, index: number) => {
      if (getSelectedItems.includes(value)) {
        specificSum += parseFloat(value.CHARGE);
        specificValues.push(value);
      }

      var ele = [
        document.getElementById(`Tag${index}`),
        document.getElementById(`Descr${index}`),
      ] as HTMLElement[];
      if (ele[0] && ele[1]) {
        let class_name = ele[0].getAttribute("class") || "";
        ele[0].setAttribute("class", class_name.split("-selected")[0]);
        class_name = ele[1].getAttribute("class") || "";
        ele[1].setAttribute("class", class_name.split("-selected")[0]);
      }
    });

    setSum((oldSum) => oldSum - specificSum);
    setSelectedItems((oldSelected) =>
      oldSelected.filter((trans: any) => !specificValues.includes(trans))
    );
    props.setIndividualData(
      getSelectedItems.filter((trans: any) => !specificValues.includes(trans))
    );
  };
  const handleSelectAll = () => {
    const filterBy: string = tabState;
    const filteredData: any[] = props.data.filter((trans: any) => {
      if (filterBy) {
        if (filterBy === "All") {
          return true;
        }
        return trans.DESCR.toLowerCase().includes(filterBy.toLowerCase());
      }
      return false;
    });
    if (getSelectedItems.includes(filteredData)) {
      //pass
    } else {
      const newlySelected: any[] = Array.from(
        new Set(getSelectedItems.concat(filteredData))
      );
      setSelectedItems(newlySelected);
      setSum(() => {
        var x: number = 0;
        for (let trans of newlySelected) {
          x += parseFloat(trans.CHARGE);
        }
        return parseFloat(x.toFixed(2));
      });
      props.setIndividualData(newlySelected);
    }
  };

  const getTabData = (_data: any[]): JSX.Element[] => {
    let chargedList: JSX.Element[] = [];
    _data.forEach((value: any, index: number) => {
      if (value.INCOME) return false;
      const tag = value.TRANS_DATE + value.CHARGE + value.DESCR;

      const handleHoverIn = () => {
        var ele = [
          document.getElementById(`Tag${index}`),
          document.getElementById(`Descr${index}`),
        ] as HTMLElement[];
        ele.forEach((element: HTMLElement) => {
          element.style.textDecoration = "underline";
        });
      };
      const handleHoverOut = () => {
        var ele = [
          document.getElementById(`Tag${index}`),
          document.getElementById(`Descr${index}`),
        ] as HTMLElement[];

        ele.forEach((element: HTMLElement) => {
          element.style.textDecoration = "unset";
        });
      };
      const handleClick = () => {
        var ele = [
          document.getElementById(`Tag${index}`),
          document.getElementById(`Descr${index}`),
        ] as HTMLElement[];
        var int = parseFloat(value.CHARGE);
        if (getSelectedItems.includes(value)) {
          int *= -1;
          ele.forEach((element: HTMLElement) => {
            const class_name = element.getAttribute("class") || "";
            element.setAttribute("class", class_name.split("-selected")[0]);
          });

          // Remove from state
          setSelectedItems((oldState) =>
            oldState.filter((ids) => !(ids === value))
          );
          props.setIndividualData(
            getSelectedItems.filter((ids) => !(ids === value))
          );
        } else {
          ele.forEach((element: HTMLElement) => {
            const class_name = element.getAttribute("class") || "";
            element.setAttribute("class", `${class_name}-selected`);
          });

          // add to state
          setSelectedItems((oldState) => [...oldState, value]);
          props.setIndividualData([...getSelectedItems, value]);
        }
        setSum(parseFloat((sum + int).toFixed(2)));
      };
      chargedList.push(
        <div key={tag}>
          <span
            className={
              getSelectedItems.includes(value)
                ? "priceTag-selected"
                : "priceTag"
            }
            id={"Tag" + index}
            onClick={handleClick}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            {parseFloat(value.CHARGE).toFixed(2)}
          </span>
          <span
            className={
              getSelectedItems.includes(value)
                ? "priceDescr-selected"
                : "priceDescr"
            }
            id={"Descr" + index}
            onClick={handleClick}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            {rmvExtraText(value.DESCR)}
          </span>
        </div>
      );
    });

    return chargedList;
  };

  const getDataObj = (): JSX.Element => {
    return (
      <div>
        <div className="display">
          <div id="tabs-parent" className="priceInfo-Tabs">
            {listOfNames.map((value: string) => {
              let className: string = "tabs";
              if (value === tabState) {
                className += "-selected";
              } else {
                className = "tabs";
              }

              const handleTabChange = () => {
                if (value === "All") {
                  setData(props.data);
                } else {
                  setData(
                    props.data.filter((trans: any) =>
                      trans.DESCR.toLowerCase().includes(value.toLowerCase())
                    )
                  );
                }

                setTabState(value);
              };
              return (
                <span
                  key={`${value}${props.selected.length}`}
                  className={className}
                  id={value}
                  onClick={handleTabChange}
                >
                  {value}
                </span>
              );
            })}
          </div>
          <div className="priceInfo">{getTabData(data)}</div>
        </div>
        <div className="priceSum">
          SUM: <span>{sum.toFixed(2)}</span>
          <span className="clearState" onClick={handleSelectAll}>
            SELECT ALL
          </span>
          <span className="clearState" onClick={() => handleClearClick(data)}>
            CLEAR
          </span>
        </div>
      </div>
    );
  };

  return getDataObj();
}

export default InfoDisplay;
