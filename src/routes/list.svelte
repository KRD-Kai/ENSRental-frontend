<script lang="ts">
	import { account, provider, walletBalance } from '$lib/stores/ethers'
    import { Button, Card, Spacer, Text, Badge, Container } from '@kahi-ui/framework';
    import { onMount } from 'svelte'
    let domains;
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
    onMount(async () => {
        domains = await getDomains($account);
	})
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
                    <Button>List Domain</Button>
                </Card.Footer>
            </Card.Container>
        {/each}
    {:else}
        No domains!
    {/if}
</Container>

<style>
</style>