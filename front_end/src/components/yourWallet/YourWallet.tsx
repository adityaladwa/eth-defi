import { Box, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import React, { useState } from 'react'
import { Token } from '../Main'
import { StakeForm } from './StakeForm'
import { WalletBalance } from './WalletBalance'

interface YourWalletProps {
  supportedTokens: Array<Token>
}
export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue))
  }

  return (
    <Box>
      <h1> Your Wallet! </h1>
      <Box>
        <TabContext value={selectedTokenIndex.toString()}>
          <TabList arial-label="stake from tabs" onChange={handleChange}>
            {supportedTokens.map((token, index) => {
              return (
                <Tab label={token.name} value={index.toString()} key={index} />
              )
            })}
          </TabList>
          {supportedTokens.map((value, index) => {
            return (
              <TabPanel value={index.toString()} key={index}>
                <div>
                  <WalletBalance token={supportedTokens[index]} />
                  <StakeForm token={supportedTokens[index]} />
                </div>
              </TabPanel>
            )
          })}
        </TabContext>
      </Box>
    </Box>
  )
}
