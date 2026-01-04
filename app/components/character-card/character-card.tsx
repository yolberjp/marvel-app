import Image from "next/image";
import LinkWithLoader from "../LinkLoader";
import FavoriteButton from "../favorite-button/favorite-button";

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
      <LinkWithLoader
        href={`/character/${character.id}`}
        className="border-b-4 border-b-marvel"
      >
        <Image
          src={character.imageUrl}
          alt={character.name}
          width={0}
          height={0}
          loading="eager"
          className="aspect-square size-47 object-cover object-top"
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
