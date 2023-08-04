import {CONFIG} from '@/config'
import {axiosTenantsAuthInstance} from '@/utils'

interface AdminCheckProps {
  emailAddress: string
}

export const adminCheck = async (props: AdminCheckProps) => {
  const {emailAddress} = props
  const URL = `${CONFIG.ENDPOINTS.ADMIN_CHECK}/${emailAddress}`

  const response = await axiosTenantsAuthInstance.request({
    url: URL,
    method: 'GET',
    data: props,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response?.data
}
