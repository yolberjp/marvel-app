"use client";

import { Suspense } from "react";
import SearchInput from "./search-input";

type SearchCharacterProps = {
  totalResults?: number;
};

export default function SearchCharacter({
  totalResults,
}: SearchCharacterProps) {
  return (
    <div className="w-full px-4 md:px-12 min-h-20">
      <Suspense>
        <SearchInput />
      </Suspense>
      {totalResults !== undefined && (
        <p className="text-gray-500 uppercase py-2 pl-10">
          {totalResults} Results
        </p>
      )}
    </div>
  );
}
