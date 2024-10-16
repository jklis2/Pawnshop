import { useState, useEffect } from "react";

interface SearchBarProps<T> {
  placeholder: string;
  data: T[];
  onSearch: (filteredData: T[]) => void;
  searchKeys: (keyof T)[];
}

export default function SearchBar<T>({
  placeholder,
  data,
  onSearch,
  searchKeys,
}: SearchBarProps<T>) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filteredData = data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === "string" || typeof value === "number") {
          return value.toString().toLowerCase().includes(query.toLowerCase());
        }
        return false;
      })
    );
    onSearch(filteredData);
  }, [query, data, onSearch, searchKeys]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
    />
  );
}
