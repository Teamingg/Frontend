import {FieldValues} from "react-hook-form";
import {TeamInfoData} from "@/app/team/[page_type]/[team_id]/(member)/info/page";
import {FormSchema} from "@/app/form/_type/formDataTypes";

export const formatValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.join(", "); // 배열이면 문자열로 변환
  } else if (typeof value === "object" && value !== null) {
    return JSON.stringify(value); // 객체라면 JSON 문자열 변환
  } else {
    return String(value ?? ""); // 숫자 또는 undefined면 문자열로 변환
  }
};

export const generateDefaultValues = <T extends FieldValues>(
    formFields: FormSchema[],
    infoData?: TeamInfoData[]
): Record<string, string> => {
  return formFields.reduce<Record<string, string>>((acc, field) => {
    if ("row" in field) {
      field.row.forEach(rowField => {
        const matchedInfo = infoData?.find(item => item.label === rowField.label);
        acc[String(rowField.name)] = formatValue(matchedInfo?.infoData);
      });
    } else {
      const matchedInfo = infoData?.find(item => item.label === field.label);
      acc[String(field.name)] = formatValue(matchedInfo?.infoData);
    }
    return acc;
  }, {});
};