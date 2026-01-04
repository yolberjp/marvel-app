import Image from 'next/image'

type ComicCardProps = {
  id: number
  name: string
  coverDate: string | null
  imageUrl?: string
}

export function ComicCard({ name, coverDate, imageUrl }: ComicCardProps) {
  const year = coverDate ? new Date(coverDate).getFullYear() : null

  return (
    <div className="group flex flex-col gap-2">
      <div className="flex h-63 w-42 flex-col justify-center bg-black">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={0}
            height={0}
            sizes="100vw"
            loading="eager"
            className="h-auto w-full object-cover object-top"
          />
        )}
      </div>
      <h4 className="group-hover:text-marvel leading-tight font-bold text-wrap">
        {name}
      </h4>
      {year && (
        <p className="text-sm leading-tight text-gray-500 group-hover:text-inherit">
          {year}
        </p>
      )}
    </div>
  )
}
