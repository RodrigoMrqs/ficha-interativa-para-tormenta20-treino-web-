import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="ml-56 flex-1 p-6">{children}</main>
      </div>
    </>
  )
}
