import { NextResponse } from "next/server"
import { requireSession } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { joinCampaignSchema } from "@/lib/validator/campaign"
import { z } from "zod"

export async function POST(req: Request) {
    const session = await requireSession()
    if (session instanceof NextResponse) return session

    const body = await req.json()
    const result = joinCampaignSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({ error: z.treeifyError(result.error) }, { status: 400 })
    }

    const { inviteCode, characterId } = result.data

    const campaign = await prisma.campaign.findUnique({
        where: { inviteCode }
    })

    if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404})
    }

    const character = await prisma.character.findUnique({
        where: { id: characterId, userId: session.user.id }
    })

    if (!character) {
        return NextResponse.json({ error: "Character not found" }, { status: 404 })
    }

    if (character.campaignId !== null) {
        return NextResponse.json({ error: "Character is already in a campaign" }, { status: 409 })
    }

    const alreadyHasCharacterHere = await prisma.character.findFirst({
        where: { userId: session.user.id, campaignId: campaign.id }
    })

    if (alreadyHasCharacterHere) {
        return NextResponse.json({ error: "You already have a character in this campaign" }, { status: 409 })
    }

    const updated = await prisma.character.update({
        where: { id: characterId },
        data: { campaignId: campaign.id }
    })

    return NextResponse.json(updated, { status: 201 })
}