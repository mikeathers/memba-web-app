/* eslint-disable */
import {Auth} from '@aws-amplify/auth'
import React from 'react'
import {Metadata} from 'next'

const getUsername = async () => {
  const result = await Auth.signIn('mikeatherton06@gmail.com', 'Password1!')
  console.log('RESULT', result)
  if (result) {
    console.log({result})
    const session = await Auth.currentAuthenticatedUser()
    console.log('TOKEN: ', session.attributes.given_name)
    return {userName: session.attributes.given_name}
  }
  return {userName: null}
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await getUsername()
  return {
    title: `${result.userName} | Memba`,
    description: 'Hello world',
  }
}

const CustomerLoginPage: React.FC = async () => {
  return (
    <>
      <div>Hello</div>
    </>
  )
}
export default CustomerLoginPage
