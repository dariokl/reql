# ReQL.

A simple chrome extension that can be used to mock Apollo Client graphql queries and mutations.

Extension is not published yet , but source code can be compiled and added to your chrome browser.

```
npm run buil
```

After the build

Go to chrome://extensions/. At the top right, turn on Developer mode. Click Load unpacked. Find and select build folder that has been created in root file.

# How does it work ?

One possible way to intercept or hijack requests in chrome extension with MV3 is to inject a script that monkey patches the window.fetch function, now having full control over requests. This script can then send a custom event to a content script, which communicates with a service worker to retrieve any stored responses and return a modified response to the user. If there is no stored data in the extension storage, the original response will be returned.

# Notes

Extension will inject intercept.js script only for `http://localhost:/*`.