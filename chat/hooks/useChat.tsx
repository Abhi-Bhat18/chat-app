import { ChatContext } from "@/context/chat context/ChatConext";
import { useContext } from "react";

const useChat = () => useContext(ChatContext);

export default useChat;

