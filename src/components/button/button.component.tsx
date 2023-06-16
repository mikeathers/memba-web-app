'use client'
import type React from 'react'

import type {Spacing} from '@/styles'

import {StyledButton} from './button.styles'

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: string
  variant: 'primary' | 'secondary' | 'text'
  $marginBottomX?: keyof Spacing
  $marginTopX?: keyof Spacing
  $marginLeftX?: keyof Spacing
  $marginRightX?: keyof Spacing
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {children, variant, ...rest} = props
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  )
}
