import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { auth, handlers, signIn, signOut } = NextAuth({ 
    adapter: PrismaAdapter(prisma),
    providers: [Google, Discord], 
    callbacks: {
        session({ session, user}) {
            session.user.id = user.id
            return session
        }
    }
})