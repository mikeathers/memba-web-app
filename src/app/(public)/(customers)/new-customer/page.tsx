/* eslint-disable */
import {NewCustomer} from '@/domains'
import {newCustomer} from '@/content'

const NewCustomerPage = () => {
  const content = newCustomer

  return <NewCustomer content={content} />
}

export default NewCustomerPage
