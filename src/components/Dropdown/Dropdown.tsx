import React, { PropsWithChildren, useState } from "react";
import { IoIosMore } from "react-icons/io";
import ToggleOptions from "./ToggleOptions";

const Dropdown: React.FC<PropsWithChildren> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative flex-col -mb-6">
      <button
        className="inline-flex items-center mt-2 p-2 text-sm font-xs text-center text-gray-900 bg-white rounded-lg hover:bg-slate-100 mr-2"
        type="button"
        title="Options"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IoIosMore size={12} />
      </button>

      {isOpen && <ToggleOptions />}
    </div>
  );
};

export default Dropdown;
