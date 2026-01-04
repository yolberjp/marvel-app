import Image from 'next/image'
import LinkWithLoader from '../LinkLoader'
import FavoriteButton from '../favorite-button/favorite-button'

type Character = {
  id: number
  name: string
  imageUrl: string
  isFavorite: boolean
}

type CharacterCardProps = {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="group flex w-47 flex-col">
      <LinkWithLoader
        href={`/character/${character.id}`}
        className="border-b-marvel border-b-4"
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

      <div className="relative flex items-center justify-between gap-2 bg-black px-4 py-4 text-white">
        <LinkWithLoader href={`/character/${character.id}`}>
          <h2 className="group-hover:text-marvel truncate text-nowrap uppercase">
            {character.name}
          </h2>
        </LinkWithLoader>
        <FavoriteButton characterId={character.id} />
        <div className="absolute right-0 bottom-0 h-0 w-0 border-b-12 border-l-12 border-white border-l-transparent" />
      </div>
    </div>
  )
}
