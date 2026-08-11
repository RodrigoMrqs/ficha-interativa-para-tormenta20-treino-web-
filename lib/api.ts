import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import type { Session } from "next-auth"
import type { CharacterModel } from "@/lib/generated/prisma/models/Character"
import type { CampaignModel } from "@/lib/generated/prisma/models/Campaign"
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

export async function requireCampaign( id: string): Promise<CampaignModel | NextResponse> {
    const campaign = await prisma.campaign.findUnique({
        where: { id }
    })

    if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404})
    }

    return campaign
}

export async function requireCampaignMaster(
    id: string,
    userId: string,
): Promise<CampaignModel | NextResponse> {
    const campaign = await prisma.campaign.findUnique({
        where: { id, masterId: userId },
    })

    if (!campaign) {
        return NextResponse.json({ error: "Campaign not found or Without a Master" }, { status: 404})
    }

    return campaign
}