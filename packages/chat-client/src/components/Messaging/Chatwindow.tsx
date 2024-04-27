import React from "react";
import Message from "./Message";

const Chatwindow = () => {
  return (
    <div className="h-full overflow-y-scroll">
      <Message key={3} message="" user="user" />
      <Message />
      <Message user="dadfa" />
      <Message />
      <Message user="232434" />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Chatwindow;
