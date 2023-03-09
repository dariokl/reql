export const customEvent = (config: RequestInit | undefined): Event =>
  new CustomEvent("mock-request", {
    detail: {
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
      // https://stackoverflow.com/questions/53898356/event-listener-receives-null-detail-if-run-after-document-loads
      body: JSON.stringify(config),
    },
  });

export const customResponse = (body: BodyInit, options: ResponseInit) => {
  const customOptions = {
    status: 200,
    headers: {
      ...options.headers,
    },
  };
  return new Response(JSON.stringify({ data: body }), customOptions);
};

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
export const promiseOptions = { once: true, passive: true };
