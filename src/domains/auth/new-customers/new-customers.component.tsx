import React from 'react'

interface NewCustomersComponentProps {
  content: newCustomerContent
}

export const NewCustomersComponent: React.FC<NewCustomersComponentProps> = (props) => {
  const {content} = props
  return <div>{content.heading}</div>
}
