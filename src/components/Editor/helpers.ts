export const isValidJson = (value: string): boolean => {
  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }

  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};
