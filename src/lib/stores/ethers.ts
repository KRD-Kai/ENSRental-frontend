import { ethers, BigNumber } from 'ethers'
import { writable, derived, type Writable } from 'svelte/store'

export const account: Writable<string> = writable(null)
export const provider = derived(account, ($account) => {
	if ($account) {
		return new ethers.providers.Web3Provider(window.ethereum);
	}
})

//Metamask ETH balance
export const walletBalance = writable(null);


    

