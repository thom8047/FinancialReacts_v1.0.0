import React from "react";

interface Props {
  text: string;
  date_type: number;
  defaultValue: number;
  onDateChange: (text: string, value: string) => void;
}

function DatePicker(props: Props): JSX.Element {
  const { text, date_type, defaultValue } = props;

  const handleSubmit = (event: any) => {
    if (event.key === "Enter") {
      if (parseInt(event.currentTarget.value)) {
        if (date_type === 0) {
          if (event.currentTarget.value > 0 && event.currentTarget.value < 13) {
            props.onDateChange(text, event.currentTarget.value);
          }
        } else if (date_type === 1) {
          if (
            event.currentTarget.value >= 2000 &&
            event.currentTarget.value <= 2050
          ) {
            props.onDateChange(text, event.currentTarget.value);
          }
        }
      }
    }
  };

  return (
    <span>
      {text}
      <input onKeyUp={handleSubmit} defaultValue={defaultValue}></input>
    </span>
  );
}

export default DatePicker;
