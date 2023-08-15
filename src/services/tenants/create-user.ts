import {CONFIG} from '@/config'
import {axiosUsersAuthInstance} from '@/utils'

export interface CreateUserAccountProps {
  emailAddress: string
  password: string
  firstName: string
  lastName: string
  groupName: string
  appId: string
  signUpRedirectUrl: string
  membership: UserMembership
}

export const createUserAccount = async (props: CreateUserAccountProps) => {
  const URL = `${CONFIG.API_ROUTES.USERS_API}/${CONFIG.ENDPOINTS.CREATE_USER}`

  return await axiosUsersAuthInstance.request({
    url: URL,
    method: 'POST',
    data: props,
  })
}

// GET APP FROM ID IN ID CODE BASE
// GET NAME
//
