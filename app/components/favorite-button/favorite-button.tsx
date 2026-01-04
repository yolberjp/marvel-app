'use client'

import { HeartIcon } from '../icons/heart'
import { HeartOffIcon } from '../icons/heart-off'
import { useFavoriteCharacters } from '../../contexts/favorite-characters-context'

type FavoriteButtonProps = {
  characterId: number
  size?: number
}

export default function FavoriteButton({
  characterId,
  size = 16,
}: FavoriteButtonProps) {
  const { ids, toggleId } = useFavoriteCharacters()
  const isFavorite = ids.includes(characterId)

  return (
    <button
      className="cursor-pointer p-1"
      onClick={() => toggleId(characterId)}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <HeartIcon width={size} height={size} />
      ) : (
        <HeartOffIcon width={size} height={size} />
      )}
    </button>
  )
}
