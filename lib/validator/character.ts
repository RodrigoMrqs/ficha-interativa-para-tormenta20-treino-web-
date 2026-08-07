import { z } from "zod"

export const CharacterClassSchema = z.object({
    class: z.string().min(1, { message: "Classe obrigatória" }),
    level: z.number().min(1, { message: "Nível obrigatório" })
})

export const CharacterSchema = z.object ({
    name:           z.string().min(1, { message: "Nome obrigatório" }),
    race:           z.string().min(1, { message: "Raça obrigatória" }),
    classes:        z.array(CharacterClassSchema).min(1, { message: "Pelo menos uma classe obrigatória" }),
    currentHp:      z.number().min(0, { message: "Pontos de vida atuais inválidos" }),
    maxHp:          z.number().min(1, { message: "Pontos de vida máximos inválidos" }),
    currentMana:    z.number().min(0, { message: "Pontos de mana atuais inválidos" }),
    maxMana:        z.number().min(1, { message: "Pontos de mana máximos inválidos" }),
    xp:             z.number().min(0, { message: "Experiência inválida" }),
    strength:       z.number().min(1, { message: "Força inválida" }),
    constitution:   z.number().min(1, { message: "Constituição inválida" }),
    dexterity:      z.number().min(1, { message: "Destreza inválida" }),
    intelligence:   z.number().min(1, { message: "Inteligência inválida" }),
    wisdom:          z.number().min(1, { message: "Sabedoria inválida" }),
    charisma:       z.number().min(1, { message: "Carisma inválido" })
})

export type CharacterFormData = z.infer<typeof CharacterSchema>
export type CharacterClassFormData = z.infer<typeof CharacterClassSchema>