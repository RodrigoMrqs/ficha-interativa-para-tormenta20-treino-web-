export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <h1 className="font-display text-5xl font-bold tracking-wide">
        Santuário T20
      </h1>
      <p className="text-muted-foreground text-lg max-w-md">
        Ficha interativa para Tormenta 20. Crie seus personagens, gerencie campanhas e role dados em tempo real.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Entrar
        </a>
        <a
          href="/registrar"
          className="border border-border px-6 py-2 rounded-md font-medium hover:bg-accent transition-colors"
        >
          Registrar
        </a>
      </div>
    </main>
  )
}
