export default async function CharactersSkeleton() {

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(188px,1fr))] gap-x-2 gap-y-8 md:gap-4 px-4 md:px-12">
            {[...Array(18)].map((_, index) => (
                <div
                    key={index}
                    className="relative w-47 h-60 bg-gray-300 animate-pulse"
                >
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-12 border-l-transparent border-b-12 border-white" />
                </div>
            ))}
        </div>
    )
}