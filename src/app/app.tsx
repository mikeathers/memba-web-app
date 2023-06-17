import type React from 'react'

import {UnauthenticatedWrapper} from '@/components'

export const App = ({children}: {children: React.ReactElement}) => {
  return <UnauthenticatedWrapper>{children}</UnauthenticatedWrapper>
}
