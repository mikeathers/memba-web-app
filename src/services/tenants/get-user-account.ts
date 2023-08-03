import {CONFIG} from '@/config'
import {axiosTenantsAuthInstance, axiosUsersAuthInstance, hasResult} from '@/utils'

interface GetUserAccountProps {
  emailAddress: string
}

export const getUserAccount = async (
  props: GetUserAccountProps,
): Promise<MembaUser | null> => {
  const {emailAddress} = props
  const URL = `${CONFIG.ENDPOINTS.GET_USER}/${emailAddress}`

  const response = await axiosUsersAuthInstance.request({
    url: URL,
    method: 'GET',
    data: props,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response?.data
}
