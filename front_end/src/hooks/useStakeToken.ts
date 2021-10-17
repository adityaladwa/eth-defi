import { useContractFunction, useEthers } from '@usedapp/core'
import { constants, Contract, utils } from 'ethers'
import ERC20 from '../chain-info/contracts/MockERC20.json'
import TokenFarm from '../chain-info/contracts/TokenFarm.json'
import networkMapping from '../chain-info/deployments/map.json'

export const useStakeTokens = (tokenAddress: string) => {
  const { chainId } = useEthers()
  const { abi } = TokenFarm

  const tokenFarmAddress = chainId
    ? networkMapping[String(chainId)]['TokenFarm'][0]
    : constants.AddressZero
  const tokenFarmInterface = new utils.Interface(abi)
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

  const erc20Abi = ERC20.abi
  const erc20Interface = new utils.Interface(erc20Abi)
  const erc20Contract = new Contract(tokenAddress, erc20Interface)

  const {
    send: approveErc20Send,
    state: approveErc20State,
  } = useContractFunction(erc20Contract, 'approve', {
    transactionName: 'Approve ERC20 transfer',
  })

  const approve = (amount: string) => {
    return approveErc20Send(tokenFarmAddress, amount)
  }

  return { approve, approveErc20State }
}
