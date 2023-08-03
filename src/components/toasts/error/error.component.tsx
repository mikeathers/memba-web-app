'use client'
import React from 'react'
import {Container, Content, Icon} from '../toasts.styles'
import {SvgIcon} from '../../svg-icon'
import {iconTokens} from '@/styles'

interface ErrorToastProps {
  children: React.ReactNode
}

export const ErrorToast: React.FC<ErrorToastProps> = (props) => {
  const {children} = props

  return (
    <Container>
      <SvgIcon
        noFill={true}
        size={20}
        viewBoxHeight={28}
        viewBoxWidth={28}
        name={iconTokens.error}
      />
      <Content>{children}</Content>
    </Container>
  )
}
