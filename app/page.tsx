import { CharacterList } from '@/app/components/character-list'
import { fetchCharacters } from '@/app/actions/characters/characters'
import SearchCharacter from '@/app/components/search-character'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>
}) {
  const queryParams = await searchParams
  const search = queryParams.search

  const { characters } = await fetchCharacters({ filters: { search } })

  return (
    <div className="flex flex-col gap-4 py-8">
      <SearchCharacter totalResults={characters.length} />
      <CharacterList characters={characters} />;
    </div>
  )
}
