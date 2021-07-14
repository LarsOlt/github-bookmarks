import React from 'react'
import styled from 'styled-components'

import { Card } from '../components/Cards/Repository'
import { Header } from '../components/Header'

export function Home () {
  const Home = styled.div`
    height: 100%;
  `

  return (
    <Home>
      <Header />
      <Card />
    </Home>
  )
}
