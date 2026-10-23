import { CharacterForm } from "@/components/character-form"

export default function NewCharacterPage() {
    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="font-display text-2xl font-bold mb-6">Criar personagem</h1>
            <CharacterForm />
        </main>
    )
}