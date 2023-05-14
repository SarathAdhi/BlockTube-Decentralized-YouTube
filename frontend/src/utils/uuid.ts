import ShortUniqueId from "short-unique-id";

export const uuid = (length: number = 5) => {
  const uid = new ShortUniqueId({ length });
  return uid();
};
