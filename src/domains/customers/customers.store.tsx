import {create} from 'zustand'

interface CustomerStore {
  tier: string
  setTier: (tier: string) => void
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  tier: 'free',
  setTier: (tier: string) => {
    set({tier})
  },
  // emailAddress: '',
  // setEmailAddress: (emailAddress: string) => {
  //   set({emailAddress})
  // },
  // password: '',
  // setPassword: (password: string) => {
  //   set({password})
  // },
  // firstName: '',
  // setFirstName: (firstName: string) => {
  //   set({firstName})
  // },
  // lastName: '',
  // setLastName: (lastName: string) => {
  //   set({lastName})
  // },
  // showPasswordFormatMessage: true,
  // setShowPasswordFormatMessage: (show: boolean) => {
  //   set({showPasswordFormatMessage: show})
  // },
}))
