import {create} from 'zustand'
import {getApp, getTenantAccount, getUserAccount} from '@/services'

interface TenantStore {
  getTenantUser: (emailAddress: string) => Promise<void>
  user: MembaUser | null
  getUser: (emailAddress: string) => Promise<void>
  app: MembaApp | null
  getApp: () => Promise<void>
}

export const useTenant = create<TenantStore>((set) => ({
  getTenantUser: async (emailAddress: string) => {
    const response = await getTenantAccount({emailAddress})
    console.log({response})
    set({user: response})
  },
  user: null,
  getUser: async (emailAddress: string) => {
    const response = await getUserAccount({emailAddress})
    console.log({response})
    set({user: response})
  },
  app: null,
  getApp: async () => {
    const fullUrl = new URL(window.location.href)
    const hostName = fullUrl.hostname
    const url = hostName.includes('localhost') ? 'mikesgym.dev.memba.co.uk' : hostName
    const app = await getApp({url})
    console.log({app})
    set({app})
  },
}))
