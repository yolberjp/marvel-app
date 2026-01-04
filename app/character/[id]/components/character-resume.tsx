import FavoriteButton from "@/app/components/favorite-button";
import Image from "next/image";

type CharacterResumeProps = {
  character: {
    id: number;
    description: string;
    imageUrl: string;
    name: string;
  };
};

export default function CharacterResume({ character }: CharacterResumeProps) {
  return (
    <div className="relative flex justify-center md:h-69 w-full bg-black">
      <div className="flex flex-col md:flex-row w-full max-w-240">
        <Image
          src={character.imageUrl}
          alt={character.name}
          width={0}
          height={0}
          loading="eager"
          className="w-full aspect-square md:size-69 object-cover object-top"
        />

        <div className="flex flex-col justify-center flex-1 p-12 gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white uppercase">
              {character.name}
            </h1>
            <FavoriteButton characterId={character.id} size={24} />
          </div>
          <p className="text-white">{character.description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-24 border-l-transparent border-b-24 border-background" />
    </div>
  );
}
