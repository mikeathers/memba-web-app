'use client'
import type React from 'react'

import {Auth} from '@aws-amplify/auth'
import {CONFIG} from '@/config'
import {AuthProvider, useAuth} from '@/context'
import {Footer} from '@/components/footer'
import {AuthenticatedContainer, Layout} from './app.styles'
import {ToastContainer} from 'react-toastify'
import {AppContent} from './app-content'

import 'react-toastify/dist/ReactToastify.css'

export const App = ({children}: {children: React.ReactElement}) => {
  const cookieStorage = {
    domain: process.env.NEXT_PUBLIC_COOKIE_STORAGE_DOMAIN,
    secure: Boolean(process.env.NEXT_PUBLIC_COOKIE_STORAGE_SECURE),
    path: process.env.NEXT_PUBLIC_COOKIE_STORAGE_PATH,
    expires: Number(process.env.NEXT_PUBLIC_COOKIE_STORAGE_EXPIRES),
  }
  Auth.configure({
    mandatorySignIn: false,
    region: 'eu-west-2',
    userPoolId: CONFIG.AMPLIFY.USER_POOL_ID,
    identityPoolId: CONFIG.AMPLIFY.IDENTITY_POOL_ID,
    userPoolWebClientId: CONFIG.AMPLIFY.USER_WEB_CLIENT_ID,
    ssr: true,
    cookieStorage,
  })

  return (
    <AuthProvider>
      <Layout>
        <AppContent>{children}</AppContent>
        <Footer />
        <ToastContainer
          autoClose={false}
          position="bottom-left"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className={'toast-position'}
        />
      </Layout>
    </AuthProvider>
  )
}
