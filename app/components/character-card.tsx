import Image from "next/image";
import FavoriteButton from "./favorite-button";
import LinkWithLoader from "./LinkLoader";

type Character = {
  id: number;
  name: string;
  imageUrl: string;
  isFavorite: boolean;
};

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="flex flex-col w-47 group">
      <LinkWithLoader href={`/character/${character.id}`}>
        <Image
          src={character.imageUrl}
          alt={character.name}
          width={188}
          height={188}
          className="size-47 object-cover object-top border-b-4 border-b-marvel"
        />
      </LinkWithLoader>

      <div className="relative flex justify-between items-center gap-2 py-4 px-4 bg-black text-white">
        <LinkWithLoader href={`/character/${character.id}`}>
          <h2 className="uppercase truncate text-nowrap group-hover:text-marvel">
            {character.name}
          </h2>
        </LinkWithLoader>
        <FavoriteButton characterId={character.id} />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-12 border-l-transparent border-b-12 border-white" />
      </div>
    </div>
  );
}
