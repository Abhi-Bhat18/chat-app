"use client";
import React, { useEffect, useState } from "react";
import Conversations from "@/components/message/Conversations";
import Chats from "@/components/message/Chats";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const message = () => {
  const router = useRouter();
  const { userLoggedIn,user } = useAuth();
  const [data, setData] = useState();

  if (!userLoggedIn)
    return (
      <p
        className="text-blue-900 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Please Login to continue
      </p>
    );


  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl bg-gray-100 flex">
        <div className="h-screen overflow-y-auto bg-gray-50 shadow-lg basis-[30%]">
          <Conversations />
        </div>
        <div className="basis-[70%] h-screen overflow-y-auto relative">
          <Chats />
        </div>
      </div>
    </div>
  );
};

export default message;
