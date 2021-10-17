import { useEthers } from '@usedapp/core'
import { constants } from 'ethers'
import brownieConfig from '../brownie-config.json'
import networkMapping from '../chain-info/deployments/map.json'
import helperConfig from '../helper-config.json'

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
  return <div>Hi. I'm main!</div> 
}
