export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
    <div className="flex py-4">
        Character Detail for ID: {id} 
    </div>
    );
}