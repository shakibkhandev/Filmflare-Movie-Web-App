"use client";
import { fetchDataFromApi } from "@/utils/api";
import React, { useEffect, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


interface GlobalProviderProps {
  children?: React.ReactNode;
}

interface GlobalContextProps {
    urls: { backdrop: string; poster: string; profile: string } | undefined;
    setUrls: (urls: { backdrop: string; poster: string; profile: string }) => void;
  
}

const GlobalContext = React.createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
  const state = React.useContext(GlobalContext);
  if (!state) throw new Error("State Is Undefined");

  return state;
};

export const GlobalContextProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [urls, setUrls] = useState<
    { backdrop: string; poster: string; profile: string } | undefined
  >(undefined);



  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration", {})
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        setUrls(url);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApiConfig();
  }, []);
  return <GlobalContext.Provider value={{urls, setUrls}}>{children}</GlobalContext.Provider>;
};
