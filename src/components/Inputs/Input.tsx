import React, { forwardRef } from "react";

interface IProps extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  placeholder?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ placeholder, error, ...props }, ref) => {
    return (
      <div className="flex-col">
        <input
          {...props}
          ref={ref}
          type="text"
          className="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block outline-none p-2.5 h-[36px]"
          placeholder={placeholder}
        />
        {error && (
          <span className="px-[2px] mt-[2px] text-xs text-red-500/80">
            Name is requied.
          </span>
        )}
      </div>
    );
  }
);

export default Input;
