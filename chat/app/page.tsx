"use client";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
   try {
    const res = await fetch('https://devgram.in/api/check',{
    credentials : 'include'
   });
    const data = await res.json();
    console.log(data);
    setLoading(false);
   } catch (error) {
    console.log(error);
    setLoading(false)
   }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      This is home and  { loading ? 'loading' : 'not loading'}
    </div>
  );
};

export default Home;
