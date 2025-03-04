import {FieldValues, UseFormRegister, Path} from "react-hook-form";

interface Props<T extends FieldValues> {
  key?: string | number;
  label: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
}

const TextareaField = <T extends FieldValues> (
  {
    key,
    label,
    name,
    placeholder,
    register,
    error
  }: Props<T>) => (
    <div className="w-full h-32 mb-4" key={key}>
    <label htmlFor={name} className="block mb-2">{label}</label>
    <textarea
      {...register(name, { required: `${label}은(는) 필수 항목입니다.` })}
      id={name}
      placeholder={placeholder}
      className="w-full h-full border p-2 resize-none"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default TextareaField;
