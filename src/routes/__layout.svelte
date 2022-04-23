<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import "@kahi-ui/framework/dist/kahi-ui.framework.css";
    import "@kahi-ui/framework/dist/kahi-ui.theme.default.css";
    import { onMount } from 'svelte'
	import { account, provider, walletBalance } from '$lib/stores/ethers'

	onMount(() => {
		if (typeof window.ethereum === 'undefined') return
		window.ethereum
			.request( { method: 'eth_accounts' })
			.then(handleAccountsChanged)
			.catch((err) => {
				console.error(err)
			})
		window.ethereum.on('connect', (chainId) => {
			$account = window.ethereum.selectedAddress
		})
		window.ethereum.on('disconnect', console.log)
		window.ethereum.on('accountsChanged', handleAccountsChanged)
		window.ethereum.on('chainChanged', (id) => {
			window.location.reload()
		})
	})
	function handleAccountsChanged(accounts: string[]): void {
		$account = accounts[0]
	}

    $: if ($provider) {
        $provider.getBalance($account).then(bal => $walletBalance = bal)
        $provider.on("block", async () => {
            $provider.getBalance($account).then(bal => $walletBalance = bal)
        }) 
    }
</script>
<Navbar></Navbar>
<slot />

<div id="background-radial-gradient" style="width: 200vw;height: 200vh;transform: translate(-50vw, -100vh);"></div>
<style>
    #background-radial-gradient {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        width: 200vw;
        height: 200vh;
        background: radial-gradient(50% 50% at 50% 50%,#45538714 0,rgba(255,255,255,0) 100%);
        transform: translate(-50vw,-100vh);
        z-index: -1;
    }
</style>    
