/* eslint-disable */
import {NewCustomersComponent} from '@/domains'
import {newCustomer} from '@/content'

const NewCustomer = () => {
  const content = newCustomer

  return <NewCustomersComponent content={content} />
}

export default NewCustomer
