import SelectBoxField from "@/types/selectBoxField";

export const mapIdsToLabels = (
    ids: (string | number)[],
    options: SelectBoxField[]
): string[] => {
  return ids
      .map(id => options.find(opt => opt.value === String(id))?.label)
      .filter((label): label is string => !!label); // undefined 제거
};
