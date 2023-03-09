import React, { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { isValidJson } from "./helpers";
import { useFormContext } from "react-hook-form";

const JsonEditor: React.FC = (): JSX.Element => {
  const [code, setCode] = useState<string>("");
  const [jsonError, setJsonError] = useState<boolean>(false);
  const { register, setValue, getValues } = useFormContext();

  useEffect(() => {
    register("body");
    setValue("body", getValues().body);
    setCode(getValues().body);
  }, []);

  const parseJson = () => {
    if (code === "") {
      setValue("body", code);
      return;
    }

    if (!isValidJson(code)) {
      setJsonError(true);
      return;
    }

    const parsed = JSON.stringify(JSON.parse(code), null, 2);

    setCode(parsed);
    setValue("body", parsed);
    setJsonError(false);
  };

  return (
    <>
      <CodeEditor
        onBlur={parseJson}
        value={code}
        language="json"
        placeholder="Enter response Data."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          border: jsonError ? "0.5px red solid" : "",
          borderRadius: "5px",
          color: "black",
        }}
      />
      {jsonError && (
        <span className="text-xs p-2 text-red-500/70">Invalid Json</span>
      )}
    </>
  );
};

export default JsonEditor;
