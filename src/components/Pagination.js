"use client";

import React from "react";

export default function Component({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const delta = 2; // 前後に表示するページ数
    const range = [];

    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (end - start < delta * 2) {
      if (start === 1) {
        end = Math.min(totalPages, start + delta * 2);
      }
      if (end === totalPages) {
        start = Math.max(1, end - delta * 2);
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="flex justify-center gap-2 my-4">
      {/* 前へ */}
      <button
        className={`px-3 py-1 rounded border text-sm font-medium ${
          currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-red-50"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* ページ番号 */}
      {getVisiblePages().map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded border text-sm font-medium ${
            page === currentPage
              ? "bg-red-500 text-white border-red-500"
              : "text-gray-700 border-gray-300 hover:bg-red-50"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 次へ */}
      <button
        className={`px-3 py-1 rounded border text-sm font-medium ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-red-50"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
