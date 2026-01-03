import Image from "next/image";
import { HeartOffIcon } from "./icons/heart-off";
import { HeartIcon } from "./icons/heart";
import Link from "next/link";

type Character = {
    id: number;
    name: string;
    imageUrl: string;
    isFavorite: boolean;
}


type CharacterCardProps = {
    character: Character
};

export default function CharacterCard({ character }: CharacterCardProps) {

  return (
  <Link href={`/character/${character.id}`} className="flex flex-col w-47 group">
    <Image src={character.imageUrl} alt={character.name} width={100} height={344} className="w-47 h-47 object-cover object-top border-b-4 border-b-marvel"/>
    <div className="relative flex justify-between items-center gap-2 py-4 px-4 bg-black text-white">
        <h2 className="uppercase truncate text-nowrap group-hover:text-marvel">{character.name}</h2>
        <p>{character.isFavorite ? <HeartIcon /> : <HeartOffIcon />}</p>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-12 border-l-transparent border-b-12 border-white" />
    </div>
  </Link>
  );
}