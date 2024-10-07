type CreateFormProps = {
  label: string;
  placeholder: string;
  type: string;
  className?: string;
};

export default function CreateForm({
  label,
  placeholder,
  type,
  className,
}: CreateFormProps) {
  return (
    <div className={`w-full mb-4 ${className || ""}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
