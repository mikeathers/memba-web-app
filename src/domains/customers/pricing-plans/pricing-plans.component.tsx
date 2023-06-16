'use client'
import type React from 'react'

import {PricingCard, Text} from '@/components'

import {CardsContainer, Container, Content} from './pricing-plans.styles'

interface PricingPlansProps {
  content: PricingPlansContent
}

export const PricingPlansComponent: React.FC<PricingPlansProps> = (props) => {
  const {content} = props

  return (
    <Container>
      <Content>
        <Text type={'h1'}>{content.heading}</Text>
        <CardsContainer>
          <PricingCard
            titleNumber={content.freeTierTitleNumber}
            titleText={content.freeTierTitleText}
            pricePerMonth={content.freeTierPricePerMonth}
            numberOfCustomers={content.freeTierNumberOfCustomer}
            transactionalCosts={content.transactionalCosts}
            getStartedClick={() => null}
            getStarted={content.getStarted}
            findOutMore={content.findOutMore}
            findOutMoreClick={() => null}
          />
          <PricingCard
            titleNumber={content.basicTierTitleNumber}
            titleText={content.basicTierTitleText}
            pricePerMonth={content.basicTierPricePerMonth}
            numberOfCustomers={content.basicTierNumberOfCustomer}
            transactionalCosts={content.transactionalCosts}
            getStartedClick={() => null}
            getStarted={content.getStarted}
            findOutMore={content.findOutMore}
            findOutMoreClick={() => null}
          />
          <PricingCard
            titleNumber={content.premiumTierTitleNumber}
            titleText={content.premiumTierTitleText}
            pricePerMonth={content.premiumTierPricePerMonth}
            numberOfCustomers={content.premiumTierNumberOfCustomer}
            transactionalCosts={content.transactionalCosts}
            getStartedClick={() => null}
            getStarted={content.getStarted}
            findOutMore={content.findOutMore}
            findOutMoreClick={() => null}
          />
        </CardsContainer>
      </Content>
    </Container>
  )
}
