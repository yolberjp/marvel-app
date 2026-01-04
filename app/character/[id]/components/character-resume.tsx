import FavoriteButton from '../../../components/favorite-button/favorite-button'
import Image from 'next/image'

type CharacterResumeProps = {
  character: {
    id: number
    description: string
    imageUrl: string
    name: string
  }
}

export default function CharacterResume({ character }: CharacterResumeProps) {
  return (
    <div className="relative flex w-full justify-center bg-black md:h-69">
      <div className="flex w-full max-w-240 flex-col md:flex-row">
        <Image
          src={character.imageUrl}
          alt={character.name}
          width={0}
          height={0}
          loading="eager"
          className="aspect-square w-full object-cover object-top md:size-69"
        />

        <div className="flex flex-1 flex-col justify-center gap-6 p-12">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white uppercase">
              {character.name}
            </h1>
            <FavoriteButton characterId={character.id} size={24} />
          </div>
          <p className="text-white">{character.description}</p>
        </div>
      </div>
      <div className="border-background absolute right-0 bottom-0 h-0 w-0 border-b-24 border-l-24 border-l-transparent" />
    </div>
  )
}
