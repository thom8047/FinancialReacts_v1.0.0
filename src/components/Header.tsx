import React from "react";

interface Props {
  name: string;
  onNameChange: () => void;
}

function Header(props: Props) {
  return (
    <div className="App-header">
      <h1>WELCOME {props.name.toUpperCase()}!</h1>
      <button className="change-user-btn" onClick={props.onNameChange}>
        CHANGE USER
      </button>
    </div>
  );
}

export default Header;
