import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  value: string;
  options: Option[];
  label?: string;
  onChange: (value: string) => void;
}

const ReusableSelect: React.FC<SelectProps> = ({ name, value, options, label, onChange }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReusableSelect;