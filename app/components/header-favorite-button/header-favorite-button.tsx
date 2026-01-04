'use client'

import { HeartIcon } from '../icons/heart'
import { useFavoriteCharacters } from '../../contexts/favorite-characters-context'
import LinkWithLoader from '../LinkLoader'

export function HeaderFavoriteButton() {
  const { ids } = useFavoriteCharacters()

  return (
    <LinkWithLoader
      href="/favorites"
      className="inline-flex items-center gap-2 p-2 text-white"
    >
      <HeartIcon className="h-6 w-6" />
      {ids.length}
    </LinkWithLoader>
  )
}
