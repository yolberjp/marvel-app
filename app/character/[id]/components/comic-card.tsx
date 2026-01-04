import Image from "next/image";

type ComicCardProps = {
  id: number;
  name: string;
  coverDate: string | null;
  imageUrl?: string;
};

export function ComicCard({ name, coverDate, imageUrl }: ComicCardProps) {
  const year = coverDate ? new Date(coverDate).getFullYear() : null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col justify-center w-42 h-63 bg-black">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={0}
            height={0}
            sizes="100vw"
            loading="eager"
            className="object-cover object-top w-full h-auto"
          />
        )}
      </div>
      <h4 className="font-bold text-wrap leading-tight">{name}</h4>
      {year && <p className="text-sm leading-tight text-gray-500">{year}</p>}
    </div>
  );
}
