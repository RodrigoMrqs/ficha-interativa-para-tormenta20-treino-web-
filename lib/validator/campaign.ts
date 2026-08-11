import { z } from "zod"

export const createCampaignSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

export const joinCampaignSchema = z.object({
    inviteCode: z.string().min(1, "Invite code is required"),
    characterId: z.string().min(1, "Character ID is required"),
})

export type CreateCampaignData = z.infer<typeof createCampaignSchema>
export type JoinCampaignData = z.infer<typeof joinCampaignSchema>
