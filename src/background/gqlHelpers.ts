import {
  OperationDefinitionNode,
  FieldNode,
  SelectionNode,
  SelectionSetNode,
  DocumentNode,
} from "graphql";

interface RootFields {
  [key: string]: any;
}

export const mapGraphQLFields = (document: DocumentNode) => {
  const rootFields: RootFields = {};

  traverse(
    (document.definitions[0] as OperationDefinitionNode).selectionSet,
    rootFields
  );
  return rootFields;
};

const traverse = (
  node: FieldNode | SelectionNode | SelectionSetNode,
  result: RootFields
) => {
  if (node.kind === "Field") {
    const name = node.name.value;
    if (name === "__typename") {
      return;
    }
    if (node.selectionSet) {
      const selections = node.selectionSet.selections;

      const arrayIndex = selections.findIndex(
        (selection) =>
          selection.kind === "Field" && selection.name.value === "array"
      );
      if (arrayIndex !== -1) {
        const arrayObj: RootFields = {};
        for (let i = arrayIndex + 1; i < selections.length; i++) {
          traverse(selections[i], arrayObj);
        }
        result[name] = [arrayObj];
        traverse(selections[arrayIndex], arrayObj);
      } else {
        result[name] = {};
        selections.forEach((selection) => {
          traverse(selection, result[name]);
        });
      }
    } else {
      result[name] = null;
    }
  } else if (node.kind === "SelectionSet") {
    node.selections.forEach((selection) => {
      traverse(selection, result);
    });
  }
};
