'use client'
import type React from 'react'
import {useRouter} from 'next/navigation'

import {PricingCard, Text} from '@/components'
import {useCustomerStore} from '@/domains/customers/customers.store'
import {ROUTES} from '@/config'

import {CardsContainer, Container, Content} from './pricing-plans.styles'

interface PricingPlansProps {
  content: PricingPlansContent
}

const FREE_TIER = 'FREE_TIER'
const BASIC_TIER = 'BASIC_TIER'
const PREMIUM_TIER = 'PREMIUM_TIER'

export const PricingPlansComponent: React.FC<PricingPlansProps> = (props) => {
  const {content} = props
  const {setTier} = useCustomerStore()
  const router = useRouter()

  const handleGetStartedClick = (tier: string) => {
    setTier(tier)
    router.push(ROUTES.NEW_CUSTOMER)
  }

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
            getStartedClick={() => handleGetStartedClick(FREE_TIER)}
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
            getStartedClick={() => handleGetStartedClick(BASIC_TIER)}
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
            getStartedClick={() => handleGetStartedClick(PREMIUM_TIER)}
            getStarted={content.getStarted}
            findOutMore={content.findOutMore}
            findOutMoreClick={() => null}
          />
        </CardsContainer>
      </Content>
    </Container>
  )
}
