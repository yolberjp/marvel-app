import { fetchCharacters } from "../actions/characters";
import CharacterCard from "./character-card";

type CharactersProps = {
  search?: string;
}

export default async function Characters({ search }: CharactersProps) {
  const { characters } = await fetchCharacters({ search });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(188px,188px))] justify-center gap-x-2 gap-y-8 md:gap-4 px-4 md:px-12">
      {characters.map((character) => (
      <CharacterCard key={character.id} character={{...character, isFavorite: false}} />
      ))}
    </div>
  );
}