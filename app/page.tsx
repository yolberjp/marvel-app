import Link from "next/link";
import { fetchCharacters } from "./actions/characters";
import CharacterCard from "./components/character-card";

export default async function Home() {

  const {characters} = await fetchCharacters();

  return (
    <div className="flex flex-col py-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(188px,1fr))] gap-x-2 gap-y-8 md:gap-4 px-4 md:px-12">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={{...character, isFavorite: false}} />
        ))}
      </div>
    </div>
  );
}
