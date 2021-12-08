import React, { useState } from "react";
import Tab_Bar_Color_Context from "./Tab_Bar_Color_Context";

const Tab_Bar_Color_State = (props) => {
  const [color, setColor] = useState("white");

  const changeColor = (color) => {
    setColor(color);
  };

  return (
    <Tab_Bar_Color_Context.Provider value={{ color, changeColor }}>
      {props.children}
    </Tab_Bar_Color_Context.Provider>
  );
};

export default Tab_Bar_Color_State;
