import { signIn } from "@/lib/auth"

export default function LoginPage() {
    return (
        <main>
            <h1>Entrar no Santuário T20</h1>

            <form action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/" })
            }}>
                <button type="submit">Entrar com Google</button>
            </form>

            <form action={async () => {
                "use server"
                await signIn("discord", { redirectTo: "/" })
            }}>
                <button type="submit">Entrar com Discord</button>
            </form>

        </main>
    )
}