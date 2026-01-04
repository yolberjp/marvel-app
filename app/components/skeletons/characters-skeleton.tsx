export default function CharactersSkeleton({ count = 18 }: { count?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(188px,188px))] justify-center gap-x-2 gap-y-8 px-4 md:gap-4 md:px-12">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="relative h-60 w-47 animate-pulse bg-gray-300"
        >
          <div className="absolute right-0 bottom-0 h-0 w-0 border-b-12 border-l-12 border-white border-l-transparent" />
        </div>
      ))}
    </div>
  )
}
