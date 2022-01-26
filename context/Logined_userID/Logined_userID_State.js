import React, { useState } from "react";
import Logined_userID_Context from "./Logined_userID_Context";

const Logined_userID_State = (props) => {
  const [userID, setUserID] = useState("white");

  const changeLoginedUserID = (param_userID) => {
    setUserID(param_userID);
  };

  return (
    <Logined_userID_Context.Provider value={{ userID, changeLoginedUserID }}>
      {props.children}
    </Logined_userID_Context.Provider>
  );
};

export default Logined_userID_State;
