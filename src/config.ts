export const TEMP_LOCAL_STORAGE_PWD_KEY = 'TEMP_LOCAL_STORAGE_PWD_KEY'
export const IDENTITY_LOCALSTORAGE_KEY = 'IDENTITY_LOCALSTORAGE_KEY'
export const JWT_LOCALSTORAGE_KEY = 'JWT_LOCALSTORAGE_KEY'
interface PAGE_ROUTES {
  HOME: string
  SIGN_UP: string
  CONFIRM_ACCOUNT: string
  LOGIN: string
  FORGOT_PASSWORD: string
  RESET_PASSWORD: string
}

interface SITE_ROUTES {
  ID: string
}

export const PAGE_ROUTES: PAGE_ROUTES = {
  HOME: '/home',
  SIGN_UP: '/signup',
  CONFIRM_ACCOUNT: '/confirm-account',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
}

export const DEV_SITE_ROUTES: SITE_ROUTES = {
  ID: process.env.NEXT_PUBLIC_ID_APP_URL ?? '',
}

export const PROD_SITE_ROUTES: SITE_ROUTES = {
  ID: 'https://id.memba.co.uk',
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
  GET_TENANT: string
  GET_USER: string
  GET_APP: string
  CREATE_GYM_APP: string
  CREATE_USER: string
}

const ENDPOINTS: ENDPOINTS = {
  GET_TENANT: 'tenants/get-account',
  GET_USER: 'users/get-account',
  GET_APP: 'get-app',
  CREATE_GYM_APP: 'create-gym-app',
  CREATE_USER: 'users/create-account',
}

interface AMPLIFY {
  USER_POOL_ID: string
  IDENTITY_POOL_ID: string
  USER_WEB_CLIENT_ID: string
}
const DEV_AMPLIFY: AMPLIFY = {
  USER_POOL_ID: 'eu-west-2_O3gVXNPRu',
  IDENTITY_POOL_ID: 'eu-west-2:84901c60-5169-4948-8f0e-d55e87bc127e',
  USER_WEB_CLIENT_ID: '1s5g5auqd5lv6h9ucut5d7g05m',
}

const PROD_AMPLIFY: AMPLIFY = {
  USER_POOL_ID: 'eu-west-2_eWg0ysJay',
  IDENTITY_POOL_ID: 'eu-west-2:1ee6f75f-c0d0-461a-bbf2-d2e203343f22',
  USER_WEB_CLIENT_ID: '69ffemp6aklgncfv39l44beupr',
}

interface CONFIG {
  PAGE_ROUTES: PAGE_ROUTES
  SITE_ROUTES: SITE_ROUTES
  API_ROUTES: API_ROUTES
  AMPLIFY: AMPLIFY
  ENDPOINTS: ENDPOINTS
}

export const DEV_CONFIG: CONFIG = {
  PAGE_ROUTES,
  SITE_ROUTES: DEV_SITE_ROUTES,
  API_ROUTES: DEV_API_ROUTES,
  AMPLIFY: DEV_AMPLIFY,
  ENDPOINTS,
}

export const PROD_CONFIG: CONFIG = {
  PAGE_ROUTES,
  SITE_ROUTES: PROD_SITE_ROUTES,
  API_ROUTES: PROD_API_ROUTES,
  AMPLIFY: PROD_AMPLIFY,
  ENDPOINTS,
}

export enum TIERS {
  FREE = 'Free',
  BASIC = 'Basic',
  PREMIUM = 'Premium',
}

export const CONFIG =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true' ? PROD_CONFIG : DEV_CONFIG
