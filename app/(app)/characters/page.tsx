import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function CharactersPage() {
  const session = await auth()

  const characters = await prisma.character.findMany({
    where: { userId: session!.user.id },
    include: { characterClass: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main>
      <div>
        <h1>Meus Personagens</h1>
        <Link href="/character/new">Criar personagem</Link>
      </div>

      {characters.length === 0 ? (
        <p>Você ainda não tem personagens. Crie o primeiro!</p>
      ) : (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <Link href={`/character/${character.id}`}>
                <strong>{character.name}</strong>
                <span>{character.race}</span>
                <span>
                  {character.characterClass.map((c) => `${c.class} ${c.level}`).join(" / ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
