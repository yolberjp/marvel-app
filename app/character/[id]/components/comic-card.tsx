import Image from "next/image";

type ComicCardProps = {
    id: number;
    name: string;
    coverDate: string;
    imageUrl: string;
}

export function ComicCard({ name, coverDate, imageUrl}: ComicCardProps) {

    const year = new Date(coverDate).getFullYear();

    return (
    <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center w-42 h-63 bg-black">
            <Image src={imageUrl} alt={name} width={168} height={252} />
        </div>
        <h4 className="font-bold text-wrap leading-tight">{name}</h4>
        <p className="text-sm leading-tight text-gray-500">{year}</p>
    </div>
);
}