import SelectBoxField from "@/types/selectBoxField";

export const filterItemsByIds = (ids: string[], items: SelectBoxField[]) => {
  return items.filter((items) => ids.includes(items.value));
};
