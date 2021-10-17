import { Container } from '@material-ui/core'
import { ChainId, DAppProvider } from '@usedapp/core'
import React from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'

function App() {
  return (
    <DAppProvider
      config={{
        supportedChains: [ChainId.Rinkeby],
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000,
        },
      }}
    >
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>
  )
}

export default App
