import {FieldValues, UseFormRegister} from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

const InputField = (
  {
    label,
    name,
    type = "text",
    placeholder,
    register,
    error,
  }: InputFieldProps) => (
  <div className="w-full mb-4">
    <label htmlFor={name} className="block mb-2">{label}</label>
    <input
      {...register(name, {required: `${label}은(는) 필수 항목입니다.`})}
      id={name}
      type={type}
      placeholder={placeholder}
      className="border p-2 w-full"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default InputField;
