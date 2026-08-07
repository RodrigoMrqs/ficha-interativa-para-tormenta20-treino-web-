import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import type { Session } from "next-auth"
import type { CharacterModel } from "@/lib/generated/prisma/models/Character"
import { prisma } from "@/lib/prisma"


export async function requireSession(): Promise<Session | NextResponse> {
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return session
}

export async function requireCharacter( id: string, userId: string, ): Promise<CharacterModel | NextResponse> {
    const character = await prisma.character.findUnique({
        where: { id, userId },
    })

    if (!character) {
        return NextResponse.json({ error: "Character not found" }, { status: 404 })
    }

    return character
}