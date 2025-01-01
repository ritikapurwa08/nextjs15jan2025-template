"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface BlogSearchInputProps {
  minWidth?: boolean;
  query?: string;
  setQuery?: (query: string) => void;
}

const BlogSearchInput = ({
  minWidth,
  query,
  setQuery,
}: BlogSearchInputProps) => {
  return (
    <div className="relative">
      {minWidth ? (
        <div className="flex items-center justify-center p-2">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      ) : (
        <div className="relative">
          <Input
            type="text"
            placeholder="Search blogs..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery && setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default BlogSearchInput;
