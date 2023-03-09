import { MouseEventHandler, useState } from "react";

interface IProps {
  description: string;
  isEnabled: boolean;
  onChange: MouseEventHandler<HTMLDivElement>;
}

const Toggle: React.FC<IProps> = ({
  description,
  onChange,
  isEnabled = false,
}): JSX.Element => {
  return (
    <div className="relative flex flex-col items-center justify-center mb-[4px]">
      <div className="flex">
        <label className="flex gap-2 relative items-center mr-5 cursor-pointer w-[138px]">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isEnabled}
            readOnly
          />
          <div
            onClick={onChange}
            className="w-11 h-4 bg-gray-200 rounded-full peer  peer-focus:ring-purple-300  peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-500"
          ></div>
          <span className="text-xs text-gray-900">{description}</span>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
