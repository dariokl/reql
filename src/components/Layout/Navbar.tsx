import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import IconButtonWrapper from "../Common/IconButtonWrapper";

const Navbar: React.FC = (): JSX.Element => {
  const guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  const createNewMock = () => {
    chrome.storage.local.set({
      [guid()]: {
        body: "",
        name: "",
        type: "query",
        active: true,
      },
    });
  };
  return (
    <div className=" font-sans rounded-md absolute w-[580px] mt-2 bg-white shadow-md ml-2">
      <div className="flex justify-between w-full mx-auto items-center">
        <span className="py-2 px-2 text-lg font-normal text-purple-500">
          reQL.
        </span>
        <div className="flex justify-center mr-2">
          <IconButtonWrapper onClick={createNewMock}>
            <IoIosAddCircleOutline size={20} title="Add New" />
          </IconButtonWrapper>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
