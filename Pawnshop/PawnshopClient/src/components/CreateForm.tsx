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
    <div className={`w-full mb-4 ${className || ""}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
