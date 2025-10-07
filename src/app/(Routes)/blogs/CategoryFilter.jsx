"use client";

import { useSelector } from "react-redux";

export default function CategoryFilter({ categories, selected, onSelect }) {
  const themeMode = useSelector((mode) => mode.themeToggle.mode)

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`btn rounded-2xl shadow-none
            ${selected === cat
              ? "bg-blue-600 text-white"  
              : themeMode === "dark"
                ? "bg-[#16202C] text-white" 
                : "bg-white text-black border border-gray-200" 
            }
  `}
        >
          {cat}
        </button>

      ))}
    </div>
  );
}
