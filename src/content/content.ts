var s = document.createElement("script");
s.src = chrome.runtime.getURL("/static/js/intercept.js");
s.onload = function () {
  // @ts-ignore
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

document.addEventListener("mock-request", async (event: any) => {
  const { body } = event.detail;
  const request = JSON.parse(body);

  const response = await chrome.runtime.sendMessage({
    message: "get-mock-response",
    request,
  });

  // https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent
  document.dispatchEvent(
    new CustomEvent(`mock-response`, {
      detail: response,
    })
  );
});

export {};
