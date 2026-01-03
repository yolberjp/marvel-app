import { fetchCharacter } from "@/app/character/[id]/actions/character";
import CharacterResume from "./components/character-resume";
import { ComicCard } from "./components/comic-card";
import { fetchComic } from "./actions/comic";

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { character } = await fetchCharacter(id);

    const comics = await Promise.all(
        character.comics.map(async (comic) => {
            const res = await fetchComic(comic.id);
            return res.comic;
        })
    );

    return (
        <div className="flex flex-col items-center">
            <CharacterResume character={character} />

            <div className="flex flex-col gap-4 w-full max-w-252 px-6 py-12">
                <h3 className="uppercase font-bold text-3xl">Comics</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    {comics.map((comic) => (<ComicCard key={comic.id} id={comic.id} name={comic.name} coverDate={comic.cover_date} imageUrl={comic.imageUrl} />))}
                </div>
                
            </div>
        </div>
    );
}