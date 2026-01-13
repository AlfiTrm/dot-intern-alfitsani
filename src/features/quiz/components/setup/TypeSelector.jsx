import React from "react";
import { HelpCircle } from "lucide-react";
import Select from "../../../../shared/components/Select";

const TYPES = [
  { value: "", label: "Semua Tipe" },
  { value: "multiple", label: "Pilihan Ganda" },
  { value: "boolean", label: "Benar / Salah" },
];

export default function TypeSelector({ value, onChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
        <HelpCircle className="w-3 h-3 md:w-4 md:h-4 text-sky-500" />
        Tipe Pertanyaan
      </label>
      <Select
        value={value}
        onChange={onChange}
        options={TYPES}
        placeholder="Semua Tipe"
      />
    </div>
  );
}
