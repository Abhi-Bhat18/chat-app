"use client";
import React, { useState, useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { ChatContext } from "@/context/chat context/ChatConext";


const MessageInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const { websocket, convId, receiverId } = useContext(ChatContext);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !showEmojiPicker);
  };

  const sendMessage = () => {
    //sending the message through the websocket
    if (websocket?.OPEN) {
      websocket.send(message);
    }
    setMessage("");
  };

  return (
    <div className="w-full absolute bottom-0 bg-white shadow-md flex justify-center p-5 space-x-5">
      <button onClick={toggleEmojiPicker} className="text-3xl">
        <MdOutlineEmojiEmotions />
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-0">
          <EmojiPicker />
        </div>
      )}
      <input
        value={message}
        type="text"
        className="w-full p-2 rounded-md bg-gray-100 outline-none"
        placeholder="type"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="text-3xl">
        <AiOutlineSend />
      </button>
    </div>
  );
};

export default MessageInput;
