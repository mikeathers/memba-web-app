'use client'
import type React from 'react'

import {
  Container,
  Content,
  TitleContainer,
  TitleNumber,
  TitleText,
} from './pricing-card.styles'
import {Text} from '@/components'
import {spacingTokens} from '@/styles'

interface PricingCardProps {
  titleNumber: string
  titleText: string
  pricePerMonth: string
  numberOfCustomers: string
  transactionalCosts: string
  getStartedClick: () => void
}

export const PricingCard: React.FC<PricingCardProps> = (props) => {
  const {titleNumber, titleText, pricePerMonth, numberOfCustomers, transactionalCosts} =
    props
  return (
    <Container>
      <TitleContainer>
        <TitleNumber>{titleNumber}</TitleNumber>
        <TitleText>{titleText}</TitleText>
      </TitleContainer>
      <Content>
        <Text type={'h1'}>{pricePerMonth}</Text>
        <Text type={'footnote'} marginTopX={spacingTokens.space2x}>
          {transactionalCosts}
        </Text>
        <Text type={'body'} marginTopX={spacingTokens.space2x}>
          {numberOfCustomers}
        </Text>
      </Content>
    </Container>
  )
}
