"use client";

import { useState } from "react";

export default function Search({ setParams }) {
  const [searchKey, setSearchKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setParams((prev) => ({
      ...prev,
      page: 1, // reset về trang 1
      name: searchKey, // truyền name lên API
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="search"
        placeholder="Tìm sản phẩm..."
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className="flex-1 border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
      >
        Tìm
      </button>
    </form>
  );
}
