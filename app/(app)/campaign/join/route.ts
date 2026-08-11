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

    const campaing = await prisma.campaign.findUnique({
        where: { inviteCode }
    })

    if (!campaing) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404})
    }

    const character = await prisma.character.findUnique({
        where: { id: characterId, userId: session.user.id }
    })

    if (!character) {
        return NextResponse.json({ error: "Character not found" }, { status: 404 })
    }

    const entry = await prisma.characterCampaign.create({
        data: { campaignId: campaing.id, characterId }
    })

    return NextResponse.json(entry, { status: 201 })
}