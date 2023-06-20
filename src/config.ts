interface PAGE_ROUTES {
  PRICING_PLANS: string
  NEW_CUSTOMER: string
}

export const PAGE_ROUTES: PAGE_ROUTES = {
  PRICING_PLANS: 'pricing-plans',
  NEW_CUSTOMER: 'new-customer',
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
  USER_POOL_ID: 'eu-west-2_H6F7KWKl8',
  IDENTITY_POOL_ID: 'eu-west-2:c66b9ccc-9141-4ac7-a274-be74a27940bc',
  USER_WEB_CLIENT_ID: '712hh8ocdqmu3g4se27deg555i',
}

const PROD_AMPLIFY: AMPLIFY = {
  USER_POOL_ID: 'eu-west-2_5wmsSeZyn',
  IDENTITY_POOL_ID: 'eu-west-2:f0b5b5a5-c8b9-4f3c-b177-fe05f43564d3',
  USER_WEB_CLIENT_ID: '2pmgfik1pahc2uusejs3fe8kru',
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
