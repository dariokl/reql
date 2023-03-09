import { customEvent, customResponse, promiseOptions } from "./utils";
const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  let [resource, config] = args;

  let response;

  try {
    document.dispatchEvent(customEvent(config));
    const serviceWorkerResponse: any = await new Promise((resolve) => {
      document.addEventListener(
        `mock-response`,
        (response) => {
          resolve(response);
        },
        promiseOptions
      );
    });

    // @ts-ignore
    if (!serviceWorkerResponse.detail) {
      throw new Error("No mock found / no mock requested");
    }

    response = customResponse(
      serviceWorkerResponse.detail,
      config as RequestInit
    );
  } catch {
    response = await originalFetch(resource, config);
  }

  return response;
};
