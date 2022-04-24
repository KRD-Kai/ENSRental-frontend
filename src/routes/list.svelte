<script lang="ts">
	import ListModal from '$lib/components/ListModal.svelte';
    import { account, provider, walletBalance } from '$lib/stores/ethers'
    import { Button, Card, Container } from '@kahi-ui/framework';
    import { onMount } from 'svelte'
    import { ensMarket, baseRegistrar} from "$lib/stores/ethers";

    let domains;
    let isModalOpen = false;
    let labelName: string;

    async function getDomains(acc) {
        const response = await fetch("https://api.thegraph.com/subgraphs/name/ensdomains/ensrinkeby", {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: `
                query {
                    accounts(where: {id: "${acc}"}) {
                        registrations {
                            id
                            domain {
                                name
                                labelName
                                id
                            }
                        }
                    }
                }`,
            }),
        });
        const responseBody = await response.json();
        const domains = responseBody.data.accounts[0].registrations
        console.log(domains)
        return domains
    }
    $: {
        if($account) { getDomains($account).then(dms => domains = dms ) }
    }
</script>
<Container padding="small" style="display: flex; justify-content: center">
    {#if domains?.length}
        {#each domains as { domain }}
            <Card.Container class="card-preview" margin="small" style="display: inline-block">
                <Card.Figure>
                    <img src="/enslogo.png" alt="enslogo" style="max-width:75%" />
                </Card.Figure>

                <Card.Header>
                    {domain.name}
                </Card.Header>

                <Card.Footer>
                    <Button on:click={() => {
                        isModalOpen = !isModalOpen; 
                        labelName = domain.labelName;
                    }}>
                        List Domain
                    </Button>
                </Card.Footer>
            </Card.Container>
        {/each}
        <br> 
    {:else}
        No domains!
    {/if}
</Container>
<Button palette="affirmative" 
            on:click={() => $baseRegistrar.setApprovalForAll($ensMarket.address, true)
        }>Approve all</Button>

<ListModal bind:logic_state={isModalOpen} {labelName}></ListModal>