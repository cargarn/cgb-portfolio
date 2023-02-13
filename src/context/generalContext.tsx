import React, { FC, createContext, useContext } from "react";
import { IGeneralProvider, GeneralProviderProps } from "./types";

const defaultState: IGeneralProvider = {
  authorName: "",
  authorShortName: "",
};

const GeneralContext = createContext<IGeneralProvider>(defaultState);

export const GeneralProvider: FC<GeneralProviderProps> = (
  { 
    children, 
    authorName,
    authorShortName,
  } : GeneralProviderProps) => {

  const value = { authorName, authorShortName };
  return (
    <GeneralContext.Provider
      value={value}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => useContext(GeneralContext);
