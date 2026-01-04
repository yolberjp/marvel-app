export default function Comics() {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto pb-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-63 w-42 shrink-0 animate-pulse bg-gray-300"
        />
      ))}
    </div>
  )
}
