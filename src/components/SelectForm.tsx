import React from 'react';

interface SelectFormProps {
  val: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const SelectForm: React.FC<SelectFormProps> = ({
  val,
  onChange,
  options,
}) => {
  return (
    <select value={val} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
