import React from "react";

interface SelectProps {
  name: string;
  value: string;
  options: string[];
  label?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  options = [],
  label,
  onChange,
}) => {
  return (
    <div className='w-full flex flex-row-reverse items-center gap-1'>
      {label && <label htmlFor={name}>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full">
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option value="" disabled>선택할 수 있는 값이 없습니다</option>
        )}
      </select>
    </div>
  );
};

export default Select;