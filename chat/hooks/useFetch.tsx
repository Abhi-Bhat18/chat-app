import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  const fetchData = async (url: string) => {
    try {
      const response: AxiosResponse = await axios.get(url, {
        withCredentials: true,
      });

      if (response?.statusText) {
        setData(response?.data);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);
  
  return { data, loading, error };
};

export default useFetch;
