"use client";

import {
  Control,
  FieldValues, Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import TextInput from "./TextInput";

interface InputFieldProps<TFieldValues extends FieldValues> {
  key?: string | number;
  // name: keyof TFieldValues; // name 은 TFieldValues(폼 값의 키) 여야 함
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  rules: object; // 해당 인풋의 validation
  defaultValue?: string;
}
const InputField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  rules,defaultValue
}: InputFieldProps<TFieldValues> & UseControllerProps<TFieldValues>) => {
  const { field, fieldState } = useController<TFieldValues>({
    name,
    control,
    rules,
    defaultValue
  });

  return (
    <div className="py-2 flex flex-col w-full">
      <label htmlFor={name as string} className="mb-2">
        {label}
      </label>

      <TextInput id={name} {...field} error={fieldState.invalid} />

      {/* 오류메세지 */}
      {fieldState.invalid && fieldState.error && (
        <p className="py-2 text-red-400">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default InputField;
