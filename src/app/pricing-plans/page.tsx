/* eslint-disable */
import {pricingPlans} from '@/content'
import {PricingPlansComponent} from '@/domains'

const PricingPlans = () => {
  const content = pricingPlans

  return <PricingPlansComponent content={content} />
}

export default PricingPlans
