import React, { PropsWithChildren } from "react";

interface IProps {
  onClick?: () => void;
}

const IconButtonWrapper: React.FC<PropsWithChildren & IProps> = ({
  children,
  onClick,
}): JSX.Element => {
  return (
    <div
      className="hover:bg-slate-100 p-2 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconButtonWrapper;
