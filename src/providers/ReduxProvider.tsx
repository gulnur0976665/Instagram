"use client"
import { store } from "@/redux/router";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";

interface ReduxProvidersProps {
  children: ReactNode;
}
const ReduxProvider: FC<ReduxProvidersProps> = ({ children }) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default ReduxProvider;
