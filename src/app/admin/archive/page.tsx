'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from "next-auth/react"
import type { Session } from "next-auth"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { isAdmin } from '@/lib/auth'
import { motion, AnimatePresence } from 'framer-motion'
import ProfileCard from '@/app/components/profile-card'

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

type ArchivedApplication = {
  id: string
  timestamp: string
  username: string
  age: number
  experience: string
  birthplace: string
  occupation: string
  education?: string
  qualities: string
  criminalRecord: string
  characterName: string
  description: string
  character: string
  motivation: string
  weaknesses: string
  rulesAccepted: boolean
  discord: {
    id: string
    username: string
    avatar: string
    verified: boolean
    email: string
    createdAt: string
  }
  status: 'approved' | 'denied'
  statusReason?: string
  updatedAt: string
}

export default function ArchivedApplications() {
  const { data: session, status } = useSession()
  const [archivedApplications, setArchivedApplications] = useState<ArchivedApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const fetchArchivedApplications = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/applications/archive')
      if (!response.ok) {
        throw new Error('Failed to fetch archived applications')
      }
      const data = await response.json()
      setArchivedApplications(data)
    } catch (error) {
      console.error('Error fetching archived applications:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch archived applications. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const filteredApplications = useMemo(() => {
    if (!searchQuery.trim()) {
      return archivedApplications
    }

    const query = searchQuery.toLowerCase()
    return archivedApplications.filter((app) => {
      return (
        (app.username && app.username.toLowerCase().includes(query)) ||
        (app.characterName && app.characterName.toLowerCase().includes(query)) ||
        (app.discord?.username && app.discord.username.toLowerCase().includes(query)) ||
        (app.discord?.id && app.discord.id.includes(query)) ||
        (app.birthplace && app.birthplace.toLowerCase().includes(query)) ||
        (app.occupation && app.occupation.toLowerCase().includes(query)) ||
        (app.qualities && app.qualities.toLowerCase().includes(query)) ||
        (app.experience && app.experience.toLowerCase().includes(query)) ||
        (app.description && app.description.toLowerCase().includes(query)) ||
        (app.character && app.character.toLowerCase().includes(query)) ||
        (app.motivation && app.motivation.toLowerCase().includes(query)) ||
        (app.weaknesses && app.weaknesses.toLowerCase().includes(query)) ||
        (app.education && app.education.toLowerCase().includes(query)) ||
        (app.statusReason && app.statusReason.toLowerCase().includes(query))
      )
    })
  }, [archivedApplications, searchQuery])

  useEffect(() => {
    if (status === 'unauthenticated' || ((session as ExtendedSession)?.discord && !isAdmin((session as ExtendedSession).discord.id))) {
      router.push('/')
    } else if (status === 'authenticated' && isAdmin((session as ExtendedSession)?.discord?.id)) {
      fetchArchivedApplications()
    }
  }, [status, session, router, fetchArchivedApplications])

  if (status === 'loading' || isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading...
      </div>
    )
  }

  if (!(session as ExtendedSession)?.discord?.id || !isAdmin((session as ExtendedSession).discord.id)) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Archivo de Solicitudes</h1>
          <p className="text-muted-foreground">Historial de solicitudes procesadas</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/applications">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Solicitudes Activas
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar por nombre de usuario, personaje, Discord ID, ubicación, ocupación..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            {filteredApplications.length} resultado{filteredApplications.length !== 1 ? 's' : ''} encontrado{filteredApplications.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {filteredApplications.length === 0 && searchQuery ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <svg className="w-16 h-16 text-muted-foreground/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
            <p className="text-sm text-muted-foreground">Intenta con otras palabras clave</p>
          </CardContent>
        </Card>
      ) : filteredApplications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <svg className="w-16 h-16 text-muted-foreground/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">No hay solicitudes archivadas</h3>
            <p className="text-sm text-muted-foreground">Las solicitudes procesadas aparecerán aquí</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden border-border/50 hover:border-border transition-colors">
                  <CardHeader className="border-b border-border/50 bg-muted/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-1">{app.username}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Procesado {new Date(app.updatedAt).toLocaleDateString('es-ES', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === 'approved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          {app.status === 'approved' ? 'APROBADO' : 'DENEGADO'}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1">
                        <ProfileCard profile={app.discord} />
                      </div>
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Edad</p>
                            <p className="text-base font-medium">{app.age} años</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nombre del Personaje</p>
                            <p className="text-base font-medium">{app.characterName || 'No especificado'}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Experiencia Previa en RP</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.experience || 'No especificada'}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Lugar de Nacimiento</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.birthplace}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Ocupación Anterior</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.occupation}</p>
                            </div>
                          </div>

                          {app.education && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Nivel Educativo</p>
                              <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.education}</p>
                              </div>
                            </div>
                          )}

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Cualidades Principales</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.qualities}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Antecedentes Penales</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.criminalRecord}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Descripción Física</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.description}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Historia del Personaje</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.character}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Motivación del Personaje</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.motivation}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Debilidades del Personaje</p>
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.weaknesses}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 space-y-3 border-t border-border/50">
                          {app.statusReason && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Razón de la Decisión</p>
                              <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{app.statusReason}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}