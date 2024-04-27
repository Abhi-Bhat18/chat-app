"use client";
import React, { useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { CgAttachment } from "react-icons/cg";

const MessageInput = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAttachmentOnclick = () => {
    fileRef.current?.click();
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 p-5 flex items-center w-full space-x-5 border-t-[1px] border-gray-200 bg-white">
      <div className="relative flex items-center">
        <button onClick={handleAttachmentOnclick}>
          <CgAttachment className="text-xl" />
        </button>
        <input
          ref={fileRef}
          className="absolute w-0 h-0 overflow-hidden -z-1"
          type="file"
        />
      </div>
      <div className="basis-full">
        <input
          type="text"
          className="border-gray-200 p-2 w-full outline-none border-[1px] rounded-md "
          placeholder="Enter message"
        />
      </div>
      <button className="flex items-center">
        <AiOutlineSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageInput;
