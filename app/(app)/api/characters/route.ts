import { NextResponse } from "next/server"
import { requireSession, requireCharacter } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { CharacterSchema } from "@/lib/validator/character"

export async function GET() {
  const session = await requireSession()
  if (session instanceof NextResponse) {
    return session
  }

  const characters = await prisma.character.findMany({
    where: { userId: session.user.id },
    include: { characterClass: true }
  })

  return NextResponse.json(characters)
}

export async function POST(req: Request) {
  const session = await requireSession()
  if (session instanceof NextResponse) {
    return session
  }

  const body = await req.json()
  const result = CharacterSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 })
  }

  const { classes, ...characterData } = result.data

  const character = await prisma.character.create({
    data: {
      ...characterData,
      userId: session.user.id,
      characterClass: {
        create: classes,
      },
    },
    include: { characterClass: true },
  })

  return NextResponse.json(character, { status: 201 })
}