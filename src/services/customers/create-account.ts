import axios from 'axios'
import {CONFIG} from '@/config'

interface CreateCustomerAccountProps extends NewCustomerFormDetails {
  tier: string
}

const httpClient = axios.create()

export const createCustomerAccount = async (props: CreateCustomerAccountProps) => {
  const URL = `${CONFIG.API_ROUTES.TENANTS_API}/${CONFIG.ENDPOINTS.REGISTER_TENANT}`

  return await httpClient.request<RegisterTenantResponse | BadResponse>({
    url: URL,
    method: 'POST',
    data: props,
  })
}
