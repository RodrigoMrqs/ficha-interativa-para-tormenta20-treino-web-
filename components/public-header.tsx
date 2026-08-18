"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PublicHeader() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b border-border bg-background/80 backdrop-blur-sm z-50 flex items-center justify-between px-6">
      <span className="font-display text-xl font-bold tracking-wide">
        Santuário T20
      </span>

      {session ? (
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-4 text-sm font-medium">
            <Link href="/characters" className="text-foreground hover:text-primary transition-colors">
              Fichas
            </Link>
            <Link href="/campaign" className="text-foreground hover:text-primary transition-colors">
              Campanhas
            </Link>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full cursor-pointer">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={session.user?.image ?? ""}
                  alt={session.user?.name ?? ""}
                />
                <AvatarFallback>
                  {session.user?.name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="sm:hidden">
                <DropdownMenuItem>
                  <Link href="/characters" className="w-full block">Fichas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/campaign" className="w-full block">Campanhas</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
              <DropdownMenuItem>
                <Link href="/perfil" className="w-full block">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contato" className="w-full block">Contate-nos</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-destructive cursor-pointer"
              >
                Desconectar-se
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-primary text-primary-foreground px-5 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Entrar
        </Link>
      )}
    </header>
  )
}
