'use client'
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import React, { createContext, useState,useEffect } from "react";



interface AuthContextInterface {
  userLoggedIn: boolean;
  logout: () => void;
  user ? : any;
}

const initialState: AuthContextInterface = {
  userLoggedIn: false,
  logout: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(initialState);

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const checkLogin = async () => {
    const response = await axios(`${BASE_URL}/auth/checklogin`);

    if(response.status === 200){
        setUserLoggedIn(true);
    }

  };

  const logout = () => {};

  useEffect (() => {
    
  },[])

  return (
    <AuthContext.Provider value={{ userLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
