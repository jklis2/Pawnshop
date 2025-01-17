import React from "react";

type CreateFormProps = {
  label: string;
  placeholder?: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  required?: boolean;
};

export default function CreateForm({
  label,
  placeholder,
  type,
  value,
  onChange,
  className,
  name,
  required,
}: CreateFormProps) {
  return (
    <div className={`w-full ${className || ""}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
                 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                 focus:border-emerald-500 transition-colors duration-200"
      />
    </div>
  );
}
