import { Container } from '@material-ui/core'
import { ChainId, DAppProvider } from '@usedapp/core'
import React from 'react'
import { Header } from './components/Header'

function App() {
  return (
    <DAppProvider
      config={{
        supportedChains: [ChainId.Rinkeby],
      }}
    >
      <Header />
      <Container maxWidth="md">
        <div className="App">Hi.</div>
      </Container>
    </DAppProvider>
  )
}

export default App
