import { fetchCharacters } from "../actions/characters";
import { CharacterList } from "./character-list";

type CharactersProps = {
  search?: string;
};

export default async function Characters({ search }: CharactersProps) {
  const { characters } = await fetchCharacters({ filters: { search } });

  return <CharacterList characters={characters} />;
}
