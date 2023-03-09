import React, { forwardRef } from "react";
interface IProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["select"]> {}

const Select = forwardRef<HTMLSelectElement, IProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <>
        <select
          {...props}
          ref={ref}
          className="bg-slate-100 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-purple-500 block w-fit h-[36px] p-2.5"
        >
          <option value="query">Query</option>
          <option value="mutation">Mutation</option>
        </select>
      </>
    );
  }
);

export default Select;
