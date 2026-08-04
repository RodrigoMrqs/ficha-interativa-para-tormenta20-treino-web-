import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="font-display text-xl font-bold tracking-wide">
        Santuário T20
      </Link>

      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt="usuário" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground">Usuário</span>
        <Button variant="ghost" size="sm">
          Sair
        </Button>
      </div>
    </header>
  )
}
