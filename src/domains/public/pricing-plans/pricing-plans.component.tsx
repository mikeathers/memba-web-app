'use client'
import type React from 'react'
import {useRouter} from 'next/navigation'

import {PricingCard, Text} from '@/components'
import {CONFIG, TIERS} from '@/config'

import {useTenantStore} from '../stores'
import {CardsContainer, Container, Content} from './pricing-plans.styles'

interface PricingPlansProps {
  content: PricingPlansContent
}

export const PricingPlans: React.FC<PricingPlansProps> = (props) => {
  const {content} = props
  const {setTier} = useTenantStore()
  const router = useRouter()

  const handleGetStartedClick = (tier: string) => {
    setTier(tier)
    router.push(CONFIG.PAGE_ROUTES.NEW_CUSTOMER)
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
            getStartedClick={() => handleGetStartedClick(TIERS.FREE)}
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
            getStartedClick={() => handleGetStartedClick(TIERS.BASIC)}
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
            getStartedClick={() => handleGetStartedClick(TIERS.PREMIUM)}
            getStarted={content.getStarted}
            findOutMore={content.findOutMore}
            findOutMoreClick={() => null}
          />
        </CardsContainer>
      </Content>
    </Container>
  )
}
