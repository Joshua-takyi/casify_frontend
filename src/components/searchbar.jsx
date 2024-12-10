// components/Searchbar.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-2xl py-4 md:py-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
