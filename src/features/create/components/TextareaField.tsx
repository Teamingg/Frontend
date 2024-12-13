import {FieldValues, UseFormRegister} from "react-hook-form";

interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

const TextareaField = ({ label, name, placeholder, register, error }: TextareaFieldProps) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2">{label}</label>
    <textarea
      {...register(name, { required: `${label}은(는) 필수 항목입니다.` })}
      id={name}
      placeholder={placeholder}
      className="border p-2 w-full"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default TextareaField;
