import axios, {AxiosResponse} from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res: AxiosResponse) => res.data)

export const useCreateCustomerAccount = () => {
  // const URL = CONFIG.
}
