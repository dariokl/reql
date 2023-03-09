import React, { PropsWithChildren, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "../Dropdown/Dropdown";
import JsonEditor from "../Editor/JsonEditor";
import PathForm from "./PathForm";
import { useForm, FormProvider } from "react-hook-form";
import { InterceptorProps } from "../../types/Interceptor";

const InterceptorWrapper: React.FC<PropsWithChildren & InterceptorProps> = ({
  children,
  body,
  name,
  type,
  id,
  active,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      id,
      name,
      body,
      type,
      active,
    },
  });
  const {
    getValues,
    trigger,
    formState: { errors },
  } = methods;

  const handleSave = () => {
    trigger();
    if (!Object.keys(errors).length) {
      chrome.storage.local.set({ [`${id}`]: getValues() });
    }
  };
  return (
    <div className="flex-col w-[580px] ml-2 bg-white shadow-lg rounded-lg mt-4 mb-4">
      <FormProvider {...methods}>
        <div className="flex justify-between align-center">
          <div
            className="hover:bg-slate-100 rounded-lg ml-2 p-2 mt-2 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <IoIosArrowDown />
          </div>
          <Dropdown />
        </div>
        <PathForm
          onSave={() => handleSave()}
          onDelete={() => chrome.storage.local.remove([`${id}`])}
        />
        {isOpen && <JsonEditor />}
      </FormProvider>
    </div>
  );
};

export default InterceptorWrapper;
