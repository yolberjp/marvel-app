import { fetchComic } from "../actions/comic";
import { ComicCard } from "./comic-card";

type ComicsProps = {
    comics: {
        id: number;
        name: string;
    }[];
}

export default async function Comics({ comics: characterComics }: ComicsProps) {
    const comics = await Promise.all(
            characterComics.map(async (comic) => {
                const res = await fetchComic(comic.id);
                return res.comic;
            })
        );

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {comics.map((comic) => (<ComicCard key={comic.id} id={comic.id} name={comic.name} coverDate={comic.cover_date} imageUrl={comic.imageUrl} />))}
        </div>
    );
}