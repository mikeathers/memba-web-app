interface PAGE_ROUTES {
  PRICING_PLANS: string
  NEW_CUSTOMER: string
  CONFIRM_ACCOUNT: string
}

export const PAGE_ROUTES: PAGE_ROUTES = {
  PRICING_PLANS: 'pricing-plans',
  NEW_CUSTOMER: 'new-customer',
  CONFIRM_ACCOUNT: 'confirm-account',
}

interface API_ROUTES {
  USERS_API: string
  TENANTS_API: string
}

const DEV_API_ROUTES: API_ROUTES = {
  USERS_API: 'https://users.dev.memba.co.uk',
  TENANTS_API: 'https://tenants.dev.memba.co.uk',
}

const PROD_API_ROUTES: API_ROUTES = {
  USERS_API: 'https://users.memba.co.uk',
  TENANTS_API: 'https://tenants.memba.co.uk',
}

interface ENDPOINTS {
  REGISTER_TENANT: string
}

const ENDPOINTS: ENDPOINTS = {
  REGISTER_TENANT: 'register-tenant',
}

interface AMPLIFY {
  USER_POOL_ID: string
  IDENTITY_POOL_ID: string
  USER_WEB_CLIENT_ID: string
}
const DEV_AMPLIFY: AMPLIFY = {
  USER_POOL_ID: 'eu-west-2_QUR6B90gv',
  IDENTITY_POOL_ID: 'eu-west-2:266b697c-02c2-4b62-ac8e-4ffd5187ed97',
  USER_WEB_CLIENT_ID: '3tn1mhcdeiniljujjcssk3fvig',
}

const PROD_AMPLIFY: AMPLIFY = {
  USER_POOL_ID: 'eu-west-2_uyYUg5HDK',
  IDENTITY_POOL_ID: 'eu-west-2:3151f8bc-a020-45c5-bfa3-28f9907499b2',
  USER_WEB_CLIENT_ID: 'mgifkajpt6qct91shordphu0r',
}

interface CONFIG {
  PAGE_ROUTES: PAGE_ROUTES
  API_ROUTES: API_ROUTES
  AMPLIFY: AMPLIFY
  ENDPOINTS: ENDPOINTS
}

export const DEV_CONFIG: CONFIG = {
  PAGE_ROUTES,
  API_ROUTES: DEV_API_ROUTES,
  AMPLIFY: DEV_AMPLIFY,
  ENDPOINTS,
}

export const PROD_CONFIG: CONFIG = {
  PAGE_ROUTES,
  API_ROUTES: PROD_API_ROUTES,
  AMPLIFY: PROD_AMPLIFY,
  ENDPOINTS,
}

export const CONFIG =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true' ? PROD_CONFIG : DEV_CONFIG

console.log({CONFIG})
console.log('isProduction: ', process.env.NEXT_PUBLIC_IS_PRODUCTION)
