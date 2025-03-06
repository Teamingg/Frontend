import React from 'react';
import { useController, Control, FieldValues, Path } from "react-hook-form";

interface DateSelectProps<T extends string | number, TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  data: T[];
  control: Control<TFieldValues>;
  onChange?: (value: T[]) => void;
}

const Select = <T extends string | number, TFieldValues extends FieldValues>({
  label,
  name,
  data,
  control,
  onChange,
}: DateSelectProps<T, TFieldValues>) => {
  const { field } = useController<TFieldValues>({ name, control });
  return (
    <div className='w-full flex flex-row-reverse items-center gap-1'>
      {label && <label htmlFor={name}>{label}</label>}
      <select {...field} className="border border-gray-300 rounded-lg p-2 w-full" onChange={(e) => {
        const value = e.target.value as T;
        field.onChange(value);
        if (onChange) onChange(value as any);
      }}>
        {data.map((item, index) => (
          <option key={index} value={item} >{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;