"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import scss from "./LayoutAuth.module.scss";

interface ILayoutAuthProps {
  children: ReactNode;
}

const LayoutAuth: FC<ILayoutAuthProps> = ({ children }) => {
  return (
    <div className={scss.LayoutAuth}>
      <main>{children}</main>
    </div>
  );
};

export default LayoutAuth;
