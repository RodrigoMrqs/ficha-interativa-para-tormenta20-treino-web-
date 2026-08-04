import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const navLinks = [
  { href: '/personagens', label: 'Meus Personagens' },
  { href: '/campanhas', label: 'Campanhas' },
  { href: '/compendio', label: 'Compêndio' },
]

export function Sidebar() {
  return (
    <aside className="w-56 border-r border-border bg-background fixed top-14 left-0 bottom-0 flex flex-col pt-4">
      <nav className="flex flex-col gap-1 px-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Separator className="mt-4" />
    </aside>
  )
}
