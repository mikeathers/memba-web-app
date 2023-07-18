'use client'
import React from 'react'
import {Container} from './home.styles'
import {useAuth} from '@/context'
import {Text} from '@/components'

export const Home: React.FC = () => {
  const {
    state: {user},
  } = useAuth()
  return (
    <Container>
      {user?.givenName && (
        <Text
          type={'h2'}
        >{`Hello ${user?.givenName}, it's great to have you on the platform!`}</Text>
      )}
    </Container>
  )
}
