import React from "react";
import { Layers } from "lucide-react";
import Select from "../../../../shared/components/Select";

export default function CategorySelector({
  value,
  onChange,
  options,
  loading,
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
        <Layers className="w-3 h-3 md:w-4 md:h-4 text-sky-500" />
        Kategori
      </label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder="Semua Kategori"
        disabled={loading}
      />
    </div>
  );
}
