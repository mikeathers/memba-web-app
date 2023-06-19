import {newCustomer, pricingPlans} from '@/content'

export const mockPricingPlansContent: PricingPlansContent = {
  ...JSON.parse(JSON.stringify(pricingPlans)),
}

export const mockNewCustomerContent: NewCustomerContent = {
  ...JSON.parse(JSON.stringify(newCustomer)),
}
