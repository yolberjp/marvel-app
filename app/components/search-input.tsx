'use client'

import { useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import SearchIcon from './icons/search'
import { XIcon } from './icons/x'
import LoaderCircleIcon from './icons/loader-circle'

const DEBOUNCE_DELAY = 500
const DEFAULT_SEARCH_PARAM_KEY = 'search'

export default function SearchInput({
  name: inputName,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const searchParamKey = inputName || DEFAULT_SEARCH_PARAM_KEY

  const urlSearchValue = searchParams?.get(searchParamKey) || ''
  const [searchValue, setSearchValue] = useState(urlSearchValue)

  const debounceSearchTerm = useDebouncedCallback((searchTerm) => {
    window.__startLoader?.()
    const params = new URLSearchParams(searchParams)

    if (searchTerm) {
      params.set(searchParamKey, searchTerm)
    } else {
      params.delete(searchParamKey)
    }

    replace(`${pathname}?${params.toString()}`)
  }, DEBOUNCE_DELAY)

  const onSearchInputChange = (searchTerm: string) => {
    setSearchValue(searchTerm)
    debounceSearchTerm(searchTerm)
  }

  const handleClear = () => {
    window.__startLoader?.()
    setSearchValue('')
    const params = new URLSearchParams(searchParams)
    params.delete(searchParamKey)
    replace(`${pathname}?${params.toString()}`)
  }

  const isPending = debounceSearchTerm.isPending()
  return (
    <div className="relative flex h-10 items-center border-b border-gray-600">
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
        {isPending ? (
          <LoaderCircleIcon className="size-5 animate-spin" />
        ) : (
          <SearchIcon className="size-5 text-gray-400" />
        )}
      </div>
      <input
        type="text"
        placeholder="search a character..."
        className="peer flex-1 p-2 ps-10 pe-9 uppercase outline-0 placeholder:uppercase"
        {...props}
        value={searchValue}
        onChange={(e) => {
          onSearchInputChange(e.target.value)
        }}
      />
      {!isPending && searchValue && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full items-center justify-center rounded-e-md pe-3 transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClear}
        >
          <XIcon />
        </button>
      )}
    </div>
  )
}
