import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="flex w-[600px] h-[600px] pt-[86px] bg-slate-100 text-xs">
        <div className="mx-auto w-full -mt-6">{children}</div>
      </div>
    </>
  );
};

export default Layout;
