import { fetchCharacter } from '@/app/character/[id]/actions/character'
import CharacterResume from './components/character-resume'
import Comics from './components/comics'
import { Suspense } from 'react'
import ComicsSkeleton from './components/skeletons/comics-skeleton'

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { character } = await fetchCharacter(id)

  return (
    <div className="flex flex-col items-center">
      <CharacterResume character={character} />

      <div className="flex w-full max-w-252 flex-col gap-4 px-6 py-12">
        <h3 className="text-3xl font-bold uppercase">Comics</h3>
        <Suspense fallback={<ComicsSkeleton />}>
          <Comics comics={character.comics} />
        </Suspense>
      </div>
    </div>
  )
}
