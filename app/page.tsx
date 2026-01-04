import { CharacterList } from "./components/character-list";
import { fetchCharacters } from "./actions/characters";
import SearchCharacter from "./components/search-character";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const queryParams = await searchParams;
  const search = queryParams.search;

  const { characters } = await fetchCharacters({ filters: { search } });

  return (
    <div className="flex flex-col gap-4 py-8">
      <SearchCharacter totalResults={characters.length} />
      <CharacterList characters={characters} />;
    </div>
  );
}
