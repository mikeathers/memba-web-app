'use client'
import React from 'react'
import {Container, Content, Icon} from '../toasts.styles'
import {SvgIcon} from '../../svg-icon'
import {colorTokens, iconTokens} from '@/styles'

interface SuccessToastProps {
  children: React.ReactNode
}
export const SuccessToast: React.FC<SuccessToastProps> = (props) => {
  const {children} = props

  return (
    <Container>
      <Icon>
        <SvgIcon size={12} name={iconTokens.tick} color={colorTokens.neutrals000} />
      </Icon>
      <Content>{children}</Content>
    </Container>
  )
}
