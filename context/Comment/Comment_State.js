import React, { useState } from "react";
import Comment_Context from "./Comment_Context";

const Comment_State = (props) => {
  const [shouldReload, setShouldReload] = useState(false);

  const changeShouldReload = (shouldReload) => {
    setShouldReload(shouldReload);
  };

  return (
    <>
      <Comment_Context.Provider value={{ shouldReload, changeShouldReload }}>
        {props.children}
      </Comment_Context.Provider>
    </>
  );
};

export default Comment_State;
