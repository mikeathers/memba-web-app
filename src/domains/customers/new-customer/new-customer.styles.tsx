import styled from 'styled-components'
import {borderRadius, colors, spacing} from '@/styles'

export const Header = styled.p`
  font-weight: 600;
`
export const Container = styled.div``
export const YourPlanContainer = styled.div`
  margin: ${spacing.space3x} 0;
`
export const YourPlanCard = styled.div`
  margin-top: ${spacing.space2x};
  border: 1px solid ${colors.blues100};
  padding: ${spacing.space3x} ${spacing.space2x};
  border-radius: ${borderRadius.rounded};
  background-color: ${colors.neutrals000};
  filter: drop-shadow(0px 2px 3px rgba(30, 37, 78, 0.1));
  display: flex;
  align-items: center;
  justify-content: space-between;
`
