import { ethers, BigNumber } from 'ethers'
import { writable, derived, type Writable } from 'svelte/store'
import ensMarketAbi from "$lib/abis/ENSMarket.json"
import baseRegistrarAbi from "$lib/abis/BaseRegistrar.json"

export const account: Writable<string> = writable(null)
export const provider = derived(account, ($account) => {
	if ($account) {
		return new ethers.providers.Web3Provider(window.ethereum);
	}
})
export const ensMarket = derived(provider, $provider => {
    if (!$provider) return null;         
    const signer = $provider.getSigner();
    return new ethers.Contract("0x6744106b1BFb6186Ef0B63774DfC41bCD5dC26AD", ensMarketAbi, signer)
})

export const baseRegistrar = derived(provider, $provider => {
    if (!$provider) return null;         
    const signer = $provider.getSigner();
    return new ethers.Contract("0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85", baseRegistrarAbi, signer)
})


//Metamask ETH balance
export const walletBalance = writable(null);


    

