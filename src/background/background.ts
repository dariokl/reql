import { mapGraphQLFields } from "./gqlHelpers";
import { parse, OperationDefinitionNode } from "graphql";

chrome.runtime.onMessage.addListener(
  ({ message, request }, _, sendResponse) => {
    if (message === "get-mock-response") {
      (async () => {
        const body = JSON.parse(request.body);
        const parsedQuery = parse(body.query);

        const operationDefinition = parsedQuery.definitions.find(
          (definition): definition is OperationDefinitionNode =>
            definition.kind === "OperationDefinition"
        );

        const operationName = operationDefinition?.name?.value;

        const storedResponses = await chrome.storage.local.get(null);

        const isInStoreResponse = Object.entries(storedResponses).filter(
          (response) =>
            response[1].name === operationName &&
            response[1].type === operationDefinition?.operation
        );

        const shouldSendResponse =
          isInStoreResponse.length &&
          isInStoreResponse[0][1].body &&
          isInStoreResponse[0][1].active;
        if (shouldSendResponse) {
          sendResponse(JSON.parse(isInStoreResponse[0][1].body));
          return;
        }

        const shouldAutoGenerateResponse =
          isInStoreResponse.length &&
          isInStoreResponse[0][1].active &&
          isInStoreResponse[0][1].autoGenerate;

        if (shouldAutoGenerateResponse) {
          const response = mapGraphQLFields(parsedQuery);

          chrome.storage.local.set({
            [isInStoreResponse[0][0]]: {
              ...isInStoreResponse[0][1],
              body: JSON.stringify(response, null, 2),
            },
          });

          sendResponse(response);
        }

        sendResponse(null);
      })();

      return true;
    }
  }
);
