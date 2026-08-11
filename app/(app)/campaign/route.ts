import { NextResponse } from "next/server"
import { requireSession } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { createCampaignSchema } from "@/lib/validator/campaign"
import { z } from "zod"

export async function GET() {
    const session = await requireSession()
    if (session instanceof NextResponse) {
        return session
    }

    const campaigns = await prisma.campaign.findMany({
        where: {
            OR: [
                { masterId: session.user.id },
                { characterCampaigns: { some: { character: { userId: session.user.id } } } }
            ]
        },

        include: {
            master: { select: { id: true, name: true, image: true } },
            _count: { select: { characterCampaigns: true } }
        }
    })

    return NextResponse.json(campaigns)
}

export async function POST(req: Request) {
    const session = await requireSession()
    if (session instanceof NextResponse) return session

    const body = await req.json()
    const result = createCampaignSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({ error: z.treeifyError(result.error) }, { status: 400 })
    }

    const campaign = await prisma.campaign.create({
        data: {
            name: result.data.name,
            masterId: session.user.id,
        }
    })

    return NextResponse.json(campaign, { status: 201 })
}
