import React from 'react'
import {Inter} from 'next/font/google'
import {Auth} from '@aws-amplify/auth'

import './globals.css'

const inter = Inter({subsets: ['latin']})

Auth.configure({
  mandatorySignIn: false,
  region: 'eu-west-2',
  userPoolId: 'eu-west-2_H6F7KWKl8',
  identityPoolId: 'eu-west-2:c66b9ccc-9141-4ac7-a274-be74a27940bc',
  userPoolWebClientId: '712hh8ocdqmu3g4se27deg555i',
})

export const metadata = {
  title: 'My App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}