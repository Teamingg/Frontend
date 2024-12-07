"use client";

import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import TextInput from "../../ui/Input/TextInput";

interface InputFieldProps<TFieldValues extends FieldValues> {
  // name 은 TFieldValues(폼 값의 키) 여야 함
  name: keyof TFieldValues;
  control: Control<TFieldValues>;
  label: string;
  // 해당 인풋의 validation
  rules: object;
}
const InputField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  rules,
}: InputFieldProps<TFieldValues> & UseControllerProps<TFieldValues>) => {
  const { field, fieldState } = useController<TFieldValues>({
    name,
    control,
    rules,
  });

  return (
    <div className="py-2 flex flex-col w-full">
      <label htmlFor={name as string} className="mb-2">
        {label}
      </label>
      <TextInput error={fieldState.invalid} {...field} id={name} />

      {/* 오류메세지 */}
      {fieldState.invalid && fieldState.error && (
        <p className="py-2 text-red-400">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default InputField;
