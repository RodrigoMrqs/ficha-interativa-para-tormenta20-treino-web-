import { requireSession, requireCampaign, requireCampaignMaster } from "@/lib/api"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await requireSession()
    if (session instanceof NextResponse) return session

    const { id } = await params

    const campaignCheck = await requireCampaign(id)
    if (campaignCheck instanceof NextResponse) return campaignCheck

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            master: { select: { id: true, name: true, image: true } },
            characterCampaigns: {
                include: {
                    character: { select: { id: true, name: true, race: true } }
                }
            }
        }
    })

    return NextResponse.json(campaign)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await requireSession()
    if (session instanceof NextResponse) return session

    const { id } = await params

    const campaign = await requireCampaignMaster(id, session.user.id)
    if (campaign instanceof NextResponse) return campaign

    await prisma.campaign.delete({ where: { id } })

    return new NextResponse(null, { status: 204 })
}