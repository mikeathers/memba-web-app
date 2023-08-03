'use client'
import type React from 'react'

import type {Spacing} from '@/styles'
import {colorTokens, iconTokens, spacingTokens} from '@/styles'

import {Text} from '../text'
import {
  Container,
  RightIconWrapper,
  StyledTextInput,
  TextInputWrapper,
} from './text-input.styles'
import {SvgIcon} from '../svg-icon'
import {useState} from 'react'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $marginBottomX?: keyof Spacing
  $marginTopX?: keyof Spacing
  $marginLeftX?: keyof Spacing
  $marginRightX?: keyof Spacing
  label?: string
  error?: FormikError | undefined
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {label, ...rest} = props
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleType = () => {
    console.log()
    if (props.type !== 'password') return props.type
    else if (props.type === 'password' && showPassword) return 'text'
    else return 'password'
  }

  return (
    <Container>
      {label && (
        <Text type={'label'} $marginBottomX={spacingTokens.spaceHalfx}>
          {label}
        </Text>
      )}
      <TextInputWrapper>
        <StyledTextInput {...rest} type={handleType()} />
        {props.type === 'password' && (
          <RightIconWrapper onClick={() => setShowPassword(!showPassword)}>
            <SvgIcon
              name={showPassword ? iconTokens.visible : iconTokens.hidden}
              color={colorTokens.neutrals500}
              size={16}
            />
          </RightIconWrapper>
        )}
      </TextInputWrapper>
    </Container>
  )
}
