'use client'
import type React from 'react'

import {Header} from './new-customer.styles'

interface NewCustomersComponentProps {
  content: NewCustomerContent
}

export const NewCustomersComponent: React.FC<NewCustomersComponentProps> = (props) => {
  const {content} = props
  return (
    <div>
      <Header>{content.heading}</Header>
    </div>
  )
}
