'use client'

import { useSession } from "next-auth/react"
import type { Session } from "next-auth"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'
import { isAdmin } from '@/lib/auth'

type DiscordUser = {
  id: string
  username: string
  discriminator: string
  avatar: string
  banner: string
  accentColor: number | null
  verified: boolean
  email: string
  createdAt: string
}

interface ExtendedSession extends Session {
  discord: DiscordUser
}

export default function AdminButton() {
  const { data: session } = useSession()

  if (!(session as ExtendedSession)?.discord || !isAdmin((session as ExtendedSession).discord.id)) {
    return null
  }

  return (
    <Link href="/admin/applications" passHref>
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
        <span className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Admin Panel
        </span>
      </Button>
    </Link>
  )
}

