'use client'
import {CONFIG} from '@/config'
import {useEffect} from 'react'
import {useAuth} from '@/context'
import {useRouter} from 'next/navigation'

export default function Home() {
  const {state} = useAuth()
  const router = useRouter()
  //
  // useEffect(() => {
  //   if (!state.isAuthenticating) {
  //     if (!state.isAuthenticated) {
  //       router.push(CONFIG.SITE_ROUTES.ID)
  //     } else {
  //       router.push(CONFIG.PAGE_ROUTES.APPS)
  //     }
  //   }
  // }, [state.isAuthenticated])

  return null
}
