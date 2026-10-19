import { NextResponse } from "next/server"
import { requireSession, requireCharacter } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { CharacterSchema, UpdateVitalsSchema } from "@/lib/validator/character"
import { getIO } from "@/lib/socket"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
    const session = await requireSession()
    if (session instanceof NextResponse) {
        return session
    }

    const { id } = await params

    const ownership = await requireCharacter(id, session.user.id)
    if (ownership instanceof NextResponse) return ownership

    const character = await prisma.character.findUnique({
        where: { id },
        include: { characterClass: true },
    })

    return NextResponse.json(character)
}

export async function PUT(req: Request, { params }: Params) {
    const session = await requireSession()
    if (session instanceof NextResponse) {
        return session
    }

    const { id } = await params

    const existing = await requireCharacter(id, session.user.id)
    if (existing instanceof NextResponse) return existing

    const body = await req.json()
    const result = CharacterSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({ error: result.error.format() }, { status: 400 })
    }

    const { classes, ...characterData } = result.data

    await prisma.characterClasses.deleteMany({ where: { characterId: id } })

    const character = await prisma.character.update({
        where: { id },
        data: {
            ...characterData,
            characterClass: { create: classes }
        },
        include: { characterClass: true }
    })

    return NextResponse.json(character)
}

export async function PATCH(req: Request, { params }: Params) {
    const session = await requireSession()
    if (session instanceof NextResponse) {
        return session
    }

    const { id } = await params

    const existing = await requireCharacter(id, session.user.id)
    if (existing instanceof NextResponse) return existing

    const body = await req.json()
    const result = UpdateVitalsSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({ error: result.error.format() }, { status: 400 })
    }

    const character = await prisma.character.update({
        where: { id },
        data: result.data,
    })

    if (character.campaignId !== null) {
        getIO()?.to(character.campaignId).emit("characterUpdated", {
            id: character.id,
            ...result.data,
        })
    }

    return NextResponse.json(character)
}

export async function DELETE(_req: Request, { params }: Params) {
    const session = await requireSession()
    if (session instanceof NextResponse) {
        return session
    }

    const { id } = await params

    const existing = await requireCharacter(id, session.user.id)
    if (existing instanceof NextResponse) return existing

    await prisma.character.delete({ where: { id } })

    return new NextResponse(null, { status: 204 })
}
