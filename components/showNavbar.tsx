'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from '@/components/Navbar'

export default function ShowNavbar() {
  const pathname = usePathname()
  const hide = pathname.startsWith('/embed') || pathname.startsWith('/public')|| pathname.startsWith('/billing')
  if (hide) return null

  return (
    <header className="flex justify-between items-center gap-4 ">
      <Navbar />
    </header>
  )
}