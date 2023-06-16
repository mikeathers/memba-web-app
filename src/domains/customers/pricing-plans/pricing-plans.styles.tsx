import styled from 'styled-components'
import {mediaQueries} from '@/styles'

export const Container = styled.div`
  @media (${mediaQueries.m}) {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }
`

export const Content = styled.div`
  @media (${mediaQueries.s}) {
    display: flex;
    flex-direction: column;
  }
`

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: flex-start;

  @media (${mediaQueries.s}) {
    flex-direction: row;
    margin-top: 50px;
  }
`
