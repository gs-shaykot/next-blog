"use client";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${selected === cat ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
