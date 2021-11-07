import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  text: string;
  defaultValue: string;
  onDateChange: (text: string, value: string) => void;
}

function DatePicker(props: Props): JSX.Element {
  const { text, defaultValue } = props;

  const handleSubmit = (date: Date) => {
    // M/Y format
    const value = `${date.getMonth() + 1}/${date.getFullYear()}`;
    // console.log(value);
    props.onDateChange(text, value);
  };

  return (
    <span>
      <span style={{ padding: "10px" }}>
        {props.text === "f" ? "FROM: " : "TO: "}
      </span>
      <span style={{ display: "inline-block" }}>
        <ReactDatePicker
          selected={new Date(Date.parse(defaultValue))}
          onChange={handleSubmit}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
        />
      </span>
    </span>
  );
}

export default DatePicker;
