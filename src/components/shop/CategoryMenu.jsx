"use client";

export default function CategoryMenu({ categories = [], params, setParams }) {
  const handleClick = (categoryName) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      ...(categoryName ? { category: categoryName } : { category: undefined }),
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Nút tất cả */}
      <button
        onClick={() => handleClick(null)}
        className={`border px-3 py-2 rounded text-left ${
          !params.category ? "bg-green-600 text-white" : "hover:bg-gray-100"
        }`}
      >
        Tất cả
      </button>

      {categories.map((cat) => (
        <button
          key={cat.cat_id}
          onClick={() => handleClick(cat.cat_name)}
          className={`border px-3 py-2 rounded text-left transition ${
            params.category === cat.cat_name
              ? "bg-green-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {cat.cat_name}
        </button>
      ))}
    </div>
  );
}
