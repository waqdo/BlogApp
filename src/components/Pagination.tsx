'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  endCursor?: string | null;
}

export default function Pagination({
  currentPage,
  hasNextPage,
  endCursor,
}: PaginationProps) {
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {currentPage > 1 && (
        <Link
          href={`/?page=${prevPage}`}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          ← Previous
        </Link>
      )}

      <span className="text-gray-600 font-medium">Page {currentPage}</span>

      {hasNextPage ? (
        <Link
          href={`/?page=${nextPage}&after=${endCursor}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Next →
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
        >
          Next →
        </button>
      )}
    </div>
  );
}
