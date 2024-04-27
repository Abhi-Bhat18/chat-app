import React from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Chatwindow from "./Chatwindow";

const Messaging = () => {
  return (
    <div className="relative">
      <ChatHeader />
      <Chatwindow />
      <MessageInput />
    </div>
  );
};

export default Messaging;
