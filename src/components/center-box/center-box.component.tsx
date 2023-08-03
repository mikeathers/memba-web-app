'use client'
import React, {useEffect, useState} from 'react'
import {Container, Content, FormContainer, TitleContainer} from './center-box.styles'
import {colorTokens} from '@/styles'
import {Text} from '../text'
import {useTenant} from '@/hooks'
import {string} from 'yup'
import {getApp} from '@/services'

interface CenterBoxProps {
  children: React.ReactNode
}
export const CenterBox: React.FC<CenterBoxProps> = (props) => {
  const {children} = props
  const {getApp, app} = useTenant()
  const [gymName, setGymName] = useState<string>('')

  useEffect(() => {
    getApp()
  }, [])

  useEffect(() => {
    if (app) {
      setGymName(app?.name)
    }
  }, [app])

  return (
    <Container>
      <Content>
        <TitleContainer>
          <Text type={'h1'} color={colorTokens.blues800}>
            {gymName || 'Memba'}
          </Text>
          <Text type={'footnote'} color={colorTokens.neutrals500}>
            {gymName && 'Powered by Memba'}
          </Text>
        </TitleContainer>
        <FormContainer>{children}</FormContainer>
      </Content>
    </Container>
  )
}
