import React, {useEffect} from 'react'
import {AuthenticatedContainer, UnAuthenticatedContainer} from './app.styles'
import {useAuth} from '@/context'
import {useSafeAsync, useTenant} from '@/hooks'
import {CONFIG} from '@/config'
import {useRouter, usePathname} from 'next/navigation'
import {Loading, TitleBar} from '@/components'
import {Auth} from '@aws-amplify/auth'

interface AppContentProps {
  children: React.ReactNode
}

export const AppContent: React.FC<AppContentProps> = (props) => {
  const {children} = props
  const {refreshUserSession, state} = useAuth()
  const {run, isLoading, isSuccess} = useSafeAsync()
  const router = useRouter()
  const {getTenantUser, getUser} = useTenant()
  const pathName = usePathname()

  const runRefreshUserSession = async () => {
    await run(refreshUserSession())
  }

  const handleGetUser = async () => {
    if (state.user?.emailAddress) {
      if (state.user.isTenantAdmin) {
        await run(getTenantUser(state.user?.emailAddress || ''))
      } else {
        await run(getUser(state.user?.emailAddress || ''))
      }
    }
  }

  useEffect(() => {
    runRefreshUserSession()
  }, [])

  useEffect(() => {
    const protectedRoutes = ['/home']
    const pathIsProtected = protectedRoutes.indexOf(pathName) !== -1

    if (!state.isAuthenticating && !state.isAuthenticated && pathIsProtected) {
      router.push(CONFIG.PAGE_ROUTES.SIGN_UP)
      return
    }

    if (state.isAuthenticated && !pathIsProtected) {
      router.push(CONFIG.PAGE_ROUTES.HOME)
      return
    }
  }, [pathName, state.isAuthenticated])

  useEffect(() => {
    if (pathName === '/') {
      if (state.isAuthenticated) {
        router.push(CONFIG.PAGE_ROUTES.HOME)
      } else router.push(CONFIG.PAGE_ROUTES.SIGN_UP)
    }
  }, [state])

  useEffect(() => {
    handleGetUser()
  }, [state.isAuthenticated])

  if (isLoading || state.isAuthenticating) return <Loading />

  return (
    <>
      {!state.isAuthenticating && state.isAuthenticated ? (
        <>
          <TitleBar />
          <AuthenticatedContainer>{children}</AuthenticatedContainer>
        </>
      ) : (
        <UnAuthenticatedContainer>{children}</UnAuthenticatedContainer>
      )}
    </>
  )

  return null
}
