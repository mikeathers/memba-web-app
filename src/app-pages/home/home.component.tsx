'use client'
import React from 'react'
import {Container} from './home.styles'

interface HomeProps {
  content: HomeContent
}

export const Home: React.FC<HomeProps> = (props) => {
  const {content} = props
  return <Container>{content.heading}</Container>
}
