import Link from "next/link";
import { fetchCharacters } from "./actions/characters";
import CharacterCard from "./components/character-card";

export default async function Home() {

  const {characters} = await fetchCharacters();

  return (
    <div className="flex flex-col py-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(188px,1fr))] gap-4 px-12">
        {characters.map((character) => (
          <Link href={`/character/${character.id}`} key={character.id}>
            <CharacterCard key={character.id} character={{...character, isFavorite: false}} />
          </Link>
        ))}
      </div>
    </div>
  );
}
