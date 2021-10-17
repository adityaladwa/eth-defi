import { useEthers } from '@usedapp/core'
import { constants } from 'ethers'
import brownieConfig from '../brownie-config.json'
import networkMapping from '../chain-info/deployments/map.json'
import helperConfig from '../helper-config.json'
import dapp from '../dapp.png'
import weth from '../eth.png'
import dai from '../dai.png'
import { YourWallet } from './yourWallet'

export type Token = {
  image: string
  address: string
  name: string
}
export const Main = () => {
  const { chainId } = useEthers()
  const networkName = chainId ? helperConfig[chainId] : 'dev'
  const dappTokenAddress = chainId
    ? networkMapping[String(chainId)]['DappToken'][0]
    : constants.AddressZero
  const wethTokenAddress = chainId
    ? brownieConfig['networks'][networkName]['weth_token']
    : constants.AddressZero
  const fauTokenAddress = chainId
    ? brownieConfig['networks'][networkName]['fau_token']
    : constants.AddressZero
  console.log(chainId)
  console.log(networkName)

  const supportedTokens: Array<Token> = [
    {
      image: dapp,
      address: dappTokenAddress,
      name: 'DAPP',
    },
    {
      image: weth,
      address: wethTokenAddress,
      name: 'WETH',
    },
    {
      image: dai,
      address: fauTokenAddress,
      name: 'FAU',
    },
  ]

  return <YourWallet supportedTokens={supportedTokens} />
}
