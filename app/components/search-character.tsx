'use client'

import { Suspense } from 'react'
import SearchInput from './search-input'

type SearchCharacterProps = {
  totalResults?: number
}

export default function SearchCharacter({
  totalResults,
}: SearchCharacterProps) {
  return (
    <div className="min-h-20 w-full px-4 md:px-12">
      <Suspense>
        <SearchInput />
      </Suspense>
      {totalResults !== undefined && (
        <p className="py-2 pl-10 text-gray-500 uppercase">
          {totalResults} Results
        </p>
      )}
    </div>
  )
}
