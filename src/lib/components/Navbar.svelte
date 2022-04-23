<script lang="ts">
    import { browser } from "$app/env";
    import { Omni, Button, Divider, Ellipsis, Text } from "@kahi-ui/framework";
    import { account } from '$lib/stores/ethers'
    import ThemeBtn from "./ThemeBtn.svelte";
    
    let isConnectPending = false;
    async function requestAccount() {
        isConnectPending = true;
		await window.ethereum.request({ method: 'eth_requestAccounts' }).catch(() => {isConnectPending = false;})
        isConnectPending = false;
	}
</script>
<Omni.Container margin="auto" style="background: none; min-width: ">
    <Omni.Header>
        ENSMarket
    </Omni.Header>
    <Omni.Footer>
        {#if !$account}  
            <Button palette="accent" on:click={requestAccount} disabled={isConnectPending}>
                {#if !isConnectPending}
                    Connect Wallet
                {:else}
                    <Text is="span">
                        Connecting<Ellipsis />
                    </Text>
                {/if}
            </Button>
        {:else}
            {$account}
        {/if}
        <Divider orientation="vertical" margin="small" />
        {#if browser}
            <ThemeBtn></ThemeBtn>
        {/if}
    </Omni.Footer>
</Omni.Container>   