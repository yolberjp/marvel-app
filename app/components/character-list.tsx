'use client'

import { CharacterItem } from '../types'
import CharacterCard from './character-card/character-card'

type CharacterListProps = {
  characters: CharacterItem[]
}

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(188px,188px))] justify-center gap-x-2 gap-y-8 px-4 md:gap-4 md:px-12">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={{ ...character, isFavorite: false }}
        />
      ))}
    </div>
  )
}
