import Link from 'next/link'
import { ReactNode } from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import DashboardLinks from '../components/DashboardLinks'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="items-center flex gap-2 font-semibold">
                <Image src={logo} alt="logo" className="size-6" />
                <p className="text-lg font-bold">
                  VitaNova<span className="text-primary">Designs</span>
                </p>
              </Link>
            </div>
            <div className="flex-1 ">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}
