import React from "react";

const Message = () => {
  return (
    <div className="w-full flex justify-start">
      <div className="max-w-[70%] p-2 bg-white rounded-md">
        <div>
          <p> This is the message </p>
          <p className="text-xs text-right w-full">8:30PM</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
