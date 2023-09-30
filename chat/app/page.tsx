"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex justify-center items-center space-x-2">
      <p>This is login page</p>
      <p
        className="text-blue-600 cursor-pointer"
        onClick={() => router.push("http://localhost:1337/api/v1/auth/google")}
      >
        Login
      </p>
    </div>
  );
};

export default Home;
