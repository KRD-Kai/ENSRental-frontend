<script lang="ts">
    import { browser } from "$app/env";
    import { page } from '$app/stores';
    import { Omni, Button, Divider, Ellipsis, Text, Menu, Spacer, Anchor } from "@kahi-ui/framework";
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
        <Anchor href="/" style="text-decoration: none;">
            ENSRental
        </Anchor>
    </Omni.Header>
    <Omni.Section>
        <Menu.Container
            orientation="horizontal"
        >
            <Anchor href="/list" style="text-decoration: none;">
                <Menu.Button active={$page.url.pathname === '/list'}>List</Menu.Button>
            </Anchor>
            <Anchor href="/rent" style="text-decoration: none;">
                <Menu.Button active={$page.url.pathname === '/rent'}>Rent</Menu.Button>
            </Anchor>
            <Anchor href="/resolve" style="text-decoration: none;">
                <Menu.Button active={$page.url.pathname === '/resolve'}>Resolve domain</Menu.Button>
            </Anchor>
        </Menu.Container>
    </Omni.Section>
    <Spacer />
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