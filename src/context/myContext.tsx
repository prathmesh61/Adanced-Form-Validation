// MyContext.js
import React, { createContext, useContext, useState } from "react";

type User = {
  email: string;
  id: number;
  name: string;
  password: string;
};
type Context = {
  data: User | null;
  setContextData: (newData: User) => void;
};
// MyContext.js

const MyContext = createContext<Context | null>(null);

const MyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<User | null>(null);

  const setContextData = (newData: User) => {
    setData(newData);
  };

  return (
    <MyContext.Provider value={{ data, setContextData }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { MyContextProvider, useMyContext };
