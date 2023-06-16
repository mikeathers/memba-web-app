'use client'
import type React from 'react'

import type {Spacing} from '@/styles'

import {Text} from '../'
import {Container, StyledTextInput} from './text-input.styles'
import {spacingTokens} from '@/styles'

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  $marginBottomX?: keyof Spacing
  $marginTopX?: keyof Spacing
  $marginLeftX?: keyof Spacing
  $marginRightX?: keyof Spacing
  label?: string
  error?: FormikError | undefined
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {label, ...rest} = props
  return (
    <Container>
      {label && (
        <Text type={'label'} $marginBottomX={spacingTokens.space1x}>
          {label}
        </Text>
      )}
      <StyledTextInput {...rest} />
    </Container>
  )
}
