import type {FormikErrors, FormikValues} from 'formik'

declare global {
  interface NewCustomerFormDetails extends FormikValues {
    emailAddress?: string
    password?: string
    companyName?: string
    firstName?: string
    lastName?: string
  }

  type FormikError =
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined

  type MiscContent = {
    allRightsReserved: string
  }
  type NewCustomerContent = {
    heading: string
    yourPlan: string
    perMonth: string
    freePricing: string
    basicPricing: string
    premiumPricing: string
    form: {
      companyName: string
      companyNamePlaceholder: string
      firstName: string
      firstNamePlaceholder: string
      lastName: string
      lastNamePlaceholder: string
      email: string
      emailPlaceholder: string
      password: string
      passwordPlaceholder: string
      passwordValidationMessage: string
      passwordLengthMessage: string
      createAccount: string
    }
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
}

export {}
