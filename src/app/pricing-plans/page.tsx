/* eslint-disable */
import {pricingPlans} from '@/content'
import {PricingPlans} from '@/domains'

const PricingPlansPage = () => {
  const content = pricingPlans

  return <PricingPlans content={content} />
}

export default PricingPlansPage
