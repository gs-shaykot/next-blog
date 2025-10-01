"use client";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`btn border-gray-400 rounded-2xl ${selected === cat ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
