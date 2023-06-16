import type {FormikErrors} from 'formik'

declare global {
  type NewCustomerContent = {
    heading: string
  }
  type PricingPlansContent = {
    heading: string
    freeTierTitleText: string
    freeTierTitleNumber: string
    freeTierPricePerMonth: string
    freeTierNumberOfCustomer: string
    basicTierTitleText: string
    basicTierTitleNumber: string
    basicTierPricePerMonth: string
    basicTierNumberOfCustomer: string
    premiumTierTitleText: string
    premiumTierTitleNumber: string
    premiumTierPricePerMonth: string
    premiumTierNumberOfCustomer: string
    transactionalCosts: string
    getStarted: string
    findOutMore: string
  }

  type FormikError =
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined
}

export {}
