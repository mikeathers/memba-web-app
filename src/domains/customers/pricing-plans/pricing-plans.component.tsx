'use client'
import type React from 'react'

import {PricingCard, Text} from '@/components'

import {CardsContainer, Container} from './pricing-plans.styles'

interface PricingPlansProps {
  content: PricingPlansContent
}

export const PricingPlansComponent: React.FC<PricingPlansProps> = (props) => {
  const {content} = props

  return (
    <Container>
      <Text type={'h1'}>{content.heading}</Text>
      <CardsContainer>
        <PricingCard
          titleNumber={content.freeTierTitleNumber}
          titleText={content.freeTierTitleText}
          pricePerMonth={content.freeTierPricePerMonth}
          numberOfCustomers={content.freeTierNumberOfCustomer}
          transactionalCosts={content.transactionalCosts}
          getStartedClick={() => null}
        />
      </CardsContainer>
    </Container>
  )
}
