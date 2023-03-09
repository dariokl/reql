import React, { useEffect, useState } from "react";
import InterceptorWrapper from "../components/Form/InterceptorWrapper";
import { InterceptorProps } from "../types/Interceptor";

const Main = () => {
  const [interceptors, setInterceptors] = useState<InterceptorProps[]>([]);

  useEffect(() => {
    const listener = () => {
      chrome.storage.local.get(null, (data) => {
        setInterceptors(
          Object.entries(data).map((mock) => ({
            id: mock[0],
            ...mock[1],
          })) as InterceptorProps[]
        );
      });
    };
    listener();
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  return (
    <>
      {interceptors.map((interceptor) => (
        <InterceptorWrapper {...interceptor} key={interceptor.id} />
      ))}
    </>
  );
};

export default Main;
