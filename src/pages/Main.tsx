import React, { useEffect, useState } from "react";
import MockWrapper from "../components/Form/MockWrapper";
import { IMockData } from "../types/MockTypes";

const Main = () => {
  const [interceptors, setInterceptors] = useState<IMockData[]>([]);

  useEffect(() => {
    const listener = () => {
      chrome.storage.local.get(null, (data) => {
        setInterceptors(
          Object.entries(data).map((mock) => ({
            id: mock[0],
            ...mock[1],
          })) as IMockData[]
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
        <MockWrapper {...interceptor} key={interceptor.id} />
      ))}
    </>
  );
};

export default Main;
