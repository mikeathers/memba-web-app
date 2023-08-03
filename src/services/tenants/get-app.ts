import {CONFIG} from '@/config'
import {axiosTenantsAuthInstance} from '@/utils'

interface GetAppProps {
  url: string
}

export const getApp = async (props: GetAppProps) => {
  const {url} = props
  const URL = `${CONFIG.ENDPOINTS.GET_APP}/${url}`

  try {
    const response = await axiosTenantsAuthInstance.request<MembaApp>({
      url: URL,
      method: 'GET',
    })

    return response.data
  } catch (error) {
    throw error
  }
}
