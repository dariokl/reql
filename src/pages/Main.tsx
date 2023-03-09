import React, { useEffect, useState } from "react";
import MockWrapper from "../components/Form/MockWrapper";
import { IMockData } from "../types/MockTypes";

const Main = () => {
  const [mocks, setMocks] = useState<IMockData[]>([]);

  useEffect(() => {
    const listener = () => {
      chrome.storage.local.get(null, (data) => {
        setMocks(
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
      {mocks.map((mock) => (
        <MockWrapper {...mock} key={mock.id} />
      ))}
    </>
  );
};

export default Main;
