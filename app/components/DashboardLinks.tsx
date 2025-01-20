"use client"

import { cn } from '@/lib/utils'
import {
  CalendarCheck,
  HomeIcon,
  LucideProps,
  Settings,
  Users2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
interface navLinks {
  id: number
  name: string
  href: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

export const dashboardLinks: navLinks[] = [
  {
    id: 0,
    name: 'Event Types',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    id: 1,
    name: 'Meetings',
    href: '/dashboard/meetings',
    icon: Users2,
  },
  {
    id: 2,
    name: 'Availability',
    href: '/dashboard/availability',
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]
const DashboardLinks = () => {
  const pathName = usePathname()
  
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            pathName === link.href
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:text-foreground',
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:primary'
          )}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  )
}
export default DashboardLinks
