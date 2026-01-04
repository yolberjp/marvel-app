"use client";

import SearchInput from "./search-input";

type SearchCharacterProps = {
  totalResults?: number;
};

export default function SearchCharacter({
  totalResults,
}: SearchCharacterProps) {
  return (
    <div className="w-full px-4 md:px-12 min-h-20">
      <SearchInput />
      {totalResults !== undefined && (
        <p className="text-gray-500 uppercase py-2 pl-10">
          {totalResults} Results
        </p>
      )}
    </div>
  );
}
