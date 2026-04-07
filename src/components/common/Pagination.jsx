"use client";

import React from "react";

export default function Pagination({
  totalPages = 1,
  params = {},
  onChangeParams,
}) {
  const currentPage = params.page || 1;

  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPages, currentPage + 3);

  const handleClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;

    onChangeParams &&
      onChangeParams({
        ...params,
        page: newPage,
      });
  };

  return (
    <div className="flex gap-2 mt-6 justify-center">
      <button
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded"
      >
        First
      </button>

      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded"
      >
        Previous
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const p = startPage + i;
        return (
          <button
            key={p}
            onClick={() => handleClick(p)}
            disabled={p === currentPage}
            className={`px-3 py-1 border rounded ${
              p === currentPage ? "bg-blue-500 text-white" : ""
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>

      <button
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded"
      >
        Last
      </button>
    </div>
  );
}
