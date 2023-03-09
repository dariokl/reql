import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Toggle from "../Inputs/Toggle";

const ToggleOptions: React.FC = (): JSX.Element => {
  const { watch, setValue, getValues } = useFormContext();

  const [active, autoGenerate, id] = watch(["active", "autoGenerate", "id"]);

  useEffect(() => {
    chrome.storage.local.set({
      [`${id}`]: { ...getValues(), active, autoGenerate },
    });
  }, [active, autoGenerate, id, getValues]);

  return (
    <div className="flex-col py-2 px-2 absolute z-10 right-5 top-9 bg-slate-100 shadow-lg rounded-lg transition">
      <Toggle
        description={active ? "On" : "Off"}
        isEnabled={active}
        onChange={() => setValue("active", !active)}
      />
      {/* <Toggle
        description="Auto Generate"
        isEnabled={autoGenerate}
        onChange={() => setValue("autoGenerate", !autoGenerate)}
      /> */}
    </div>
  );
};

export default ToggleOptions;
