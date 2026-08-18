import { Scroll, Dices, Zap } from "lucide-react"
import { PublicHeader } from "@/components/public-header"
import { AnimatedSection } from "@/components/animated-section"

const features = [
  {
    icon: Scroll,
    title: "Ficha completa",
    description:
      "Gerencie atributos, perícias, poderes e inventário do seu personagem em um só lugar.",
  },
  {
    icon: Dices,
    title: "Rolagem integrada",
    description:
      "Clique em qualquer atributo ou perícia para rolar os dados diretamente na ficha.",
  },
  {
    icon: Zap,
    title: "Tempo real",
    description:
      "HP, mana e status sincronizam ao vivo para todos os jogadores da campanha.",
  },
]

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main className="snap-page h-screen overflow-y-scroll snap-y snap-mandatory">
        <section className="snap-start sticky top-0 min-h-screen flex flex-col items-center justify-center gap-6 px-4 pt-14 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide">
            Santuário T20
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-lg">
            Este é o Santuário. Aqui, você pode criar e gerenciar suas fichas, criar campanhas e viver aventuras com seus amigos em tempo real. Prepare-se para embarcar em uma jornada repleta de possibilidades, onde cada escolha pode dar origem a uma nova história.
          </p>
        </section>

        <AnimatedSection>
          <section className="snap-start relative z-10 bg-card rounded-t-2xl [box-shadow:0_-24px_60px_rgba(0,0,0,0.7)] min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex flex-col items-center text-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-semibold text-lg">{title}</h2>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </main>
    </>
  )
}
