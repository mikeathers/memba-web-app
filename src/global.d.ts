import type {FormikErrors, FormikValues} from 'formik'

declare global {
  type AuthUser = {
    emailAddress: string
    familyName: string
    givenName: string
    isTenantAdmin?: boolean
    isMembaAdmin?: boolean
    tenantId?: string
  }

  type Membership = {
    name: string
    price: number
  }

  type Tenant = {
    id: string
    admins: string[]
    apps: MembaApp[]
  }

  type MembaUser = {
    authenticatedUserId: string
    emailAddress: string
    firstName: string
    id: string
    isTenantAdmin: boolean
    lastName: string
    tenantId: string
    tenant: Tenant
  }

  export type Membership = {
    name: string
    price: number
  }

  export type MembaApp = {
    name: string
    memberships: Membership[]
    id: string
    url: string
    tier: string
    type: 'gym-management'
    tenantId: string
    groupName: string
  }
  interface SignupFormDetails extends FormikValues {
    emailAddress: string
    password: string
    fullName: string
  }

  type ForgotPasswordFormDetails = Pick<SignupFormDetails, 'emailAddress'>
  type ResetPasswordFormDetails = Pick<SignupFormDetails, 'password'>

  interface LoginFormDetails extends FormikValues {
    emailAddress: string
    password: string
  }

  interface NewCustomerFormDetails extends FormikValues {
    emailAddress?: string
    password?: string
    firstName?: string
    lastName?: string
  }

  interface GetTenantUserApiResult {
    result: MembaUser
  }

  type FormikError =
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined

  type BadResponse = {
    message: string
  }
  type OKResponse = {
    statusCode: number
    body: {
      message: string
    }
  }

  type CognitoError = {
    name: string
    code: string
    message: string
  }

  type CognitoUserAttributes = {
    email: string
    family_name: string
    given_name: string
    picture?: string
    phone_number?: string
    address?: string
    'custom:isTenantAdmin'?: boolean
    'custom:isMembaAdmin'?: boolean
    'custom:tenantId'?: string
  }

  type RegisterTenantResponse = {
    statusCode: number
    body: {
      message: string
      result: {
        id: string
        tenantName: string
        tier: string
        firstName: string
        lastName: string
        emailAddress: string
        addressLineOne: string
        addressLineTwo: string
        doorNumber: string
        townCity: string
        postCode: string
        tenantUrl: string
      }
    }
  }

  /******************* ********************/
  /*************** Content ***************/
  /******************* ********************/

  type MiscContent = {
    allRightsReserved: string
  }

  type HomeContent = {
    heading: string
  }

  type SignUpContent = {
    heading: string
    termsOfService: string
    login: string
    userAlreadyExistsError: string
    fullNameRequireError: string
    genericError: string
    form: {
      fullName: string
      fullNamePlaceholder: string
      email: string
      emailPlaceholder: string
      password: string
      passwordPlaceholder: string
      signUpCta: string
      validation: {
        passwordValidationMessage: string
        passwordLengthMessage: string
        emailAddress: string
        emailAddressFormat: string
        fullName: string
        password: string
      }
    }
  }

  type LoginContent = {
    heading: string
    signUp: string
    cantLogin: string
    genericError: string
    userNotFoundError: string
    incorrectUserNameOrPassword: string
    form: {
      email: string
      emailPlaceholder: string
      password: string
      passwordPlaceholder: string
      loginCta: string
      validation: {
        emailAddress: string
        emailAddressFormat: string
        password: string
      }
    }
  }

  type ConfirmAccountContent = {
    heading: string
    emailSentMessage: string
    confirmationInstruction: string
    resendConfirmationEmail: string
    checkSpamFolder: string
    sendAgain: string
  }
}

export {}
