export default function Comics() {
    return (<div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    className="w-42 h-63 bg-gray-300 animate-pulse shrink-0"
                />
            ))}
        </div>
    );
}