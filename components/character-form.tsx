"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CharacterFormData, CharacterClassFormData } from "@/lib/validator/character"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CharacterForm({ initialData }: { initialData?: CharacterFormData }) {
    const [form, setForm] = useState<CharacterFormData>(initialData ?? {
        name: "",
        race: "",
        classes: [{ class: "", level: 1 }],
        currentHp: 0,
        maxHp: 0,
        currentMana: 0,
        maxMana: 0,
        xp: 0,
        strength: 10,
        constitution: 10,
        dexterity: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    })

    function updateField<K extends keyof CharacterFormData>(key: K, value: CharacterFormData[K]) {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    function updateClass<K extends keyof CharacterClassFormData>(
        index: number,
        key: K,
        value: CharacterClassFormData[K],
    ) {
        setForm(prev => ({
            ...prev,
            classes: prev.classes.map((c, i) => (i === index ? { ...c, [key]: value } : c)),
        }))
    }

    function addClass() {
        setForm(prev => ({ ...prev, classes: [...prev.classes, { class: "", level: 1 }] }))
    }

    function removeClass(index: number) {
        setForm(prev => ({ ...prev, classes: prev.classes.filter((_, i) => i !== index) }))
    }

    return (
        <form className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Dados básicos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={e => updateField("name", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="race">Raça</Label>
                        <Input
                            id="race"
                            value={form.race}
                            onChange={e => updateField("race", e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Classes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {form.classes.map((characterClass, index) => (
                        <div key={index} className="flex items-end gap-2"> 
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`class-${index}`}>Classe</Label>
                                <Input
                                    id={`class-${index}`}
                                    value={characterClass.class}
                                    onChange={e => updateClass(index, "class", e.target.value)}
                                />
                            </div>

                            <div className="w-20 space-y-2">
                                <Label htmlFor={`level-${index}`}>Nível</Label>
                                <Input
                                    id={`level-${index}`}
                                    type="number"
                                    min={1}
                                    value={characterClass.level}
                                    onChange={e => updateClass(index, "level", Number(e.target.value))}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={form.classes.length === 1}
                                onClick={() => removeClass(index)}
                            >
                                <X />
                            </Button>
                        </div>
                    ))}

                    <Button type="button" variant="outline" size="sm" onClick={addClass}>
                        <Plus />
                        Adicionar classe
                    </Button>
                </CardContent>
            </Card>
        </form>
    )
}
