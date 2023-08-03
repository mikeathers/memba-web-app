'use client'
import styled from 'styled-components'

import {colors, spacing} from '@/styles'

export const Layout = styled.div`
  position: relative;
`

export const AuthenticatedContainer = styled.div`
  min-height: 100vh;
  padding: 0 ${spacing.space4x} ${spacing.space8x};
`

export const UnAuthenticatedContainer = styled.div`
  min-height: 100vh;
`
