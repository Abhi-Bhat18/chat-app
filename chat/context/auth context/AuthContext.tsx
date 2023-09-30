"use client";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";


interface User {
  _id : string,
  fullName : string,
  userName : string,
  imgUrl : string,
  email : string
}
interface AuthContextInterface {
  userLoggedIn: boolean;
  logout: () => void;
  user?: User;
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
  const [user, setUser] = useState<any>();
  const checkLogin = async () => {
    const response = await axios.get(`${BASE_URL}/auth/checklogin`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setUserLoggedIn(true);
      console.log(response.data)
      setUser(response.data.populateUser);
    }
  };

  const logout = () => {};

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ userLoggedIn, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};
