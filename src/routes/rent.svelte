<script lang="ts">
    import { ensMarket} from "$lib/stores/ethers";
    import { onMount } from "svelte";
    import { Button, Card, Container, Text } from '@kahi-ui/framework';
    import { utils, BigNumber } from "ethers";
import List from "./list.svelte";

    let listings = [];
    let rentTx;
    async function getListings() {
        let listings = await $ensMarket.getAllListings();
        let arr = []
        for (let i = 0; i < listings.length; i++) {
            let updatedListing = await $ensMarket.getListing(BigNumber.from(listings[i].listingId));
            arr.push(updatedListing)
        }
        return arr;
    }
    
    $: {
        if ($ensMarket) getListings().then(lst => listings = lst );
    }

    async function getDomainById(id) {
        console.log(id.toHexString())
        
        const response = await fetch("https://api.thegraph.com/subgraphs/name/ensdomains/ensrinkeby", {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: `
                query {
                    domains(where: {labelhash: "${id.toHexString()}"}) {
                        name
                        labelName
                        id
                    }
                }`,
            }),
        });
        const responseBody = await response.json();
        const domain = responseBody.data.domains[0]
        console.log(domain)
        return domain
    }

    async function submitRental(listing) {
        $ensMarket.rentToken(
            listing.listingId,
            { value: listing.price }
        ).then(tx => {
            rentTx = tx;
            tx.wait(1).then(tx => {
                rentTx = tx;
                console.log(tx)
            })
        }).catch(console.error);
    }
</script>

{#if listings.length > 0}
    {#each listings as listing}
        {#if listing.status === 0}
        <Card.Container class="card-preview" margin="small" style="display: inline-block">
            <Card.Figure>
                <img src="/enslogo.png" alt="enslogo" style="max-width:75%" />
            </Card.Figure>

            <Card.Header>
                {#await getDomainById(listing.tokenId)}
                    getting domain...
                {:then domain}
                    {domain.name}
                {:catch error}
                    Error getting ENS name
                {/await}    
            </Card.Header>

            <Card.Section>
                <Text is="b">Price: </Text> {utils.formatEther(listing.price)} ETH <br>
                <Text is="b">Duration: </Text> {listing.numberOfDays} days
            </Card.Section>

            <Card.Footer>
                <!-- <Button on:click={() => {
                    isModalOpen = !isModalOpen; 
                    labelName = domain.labelName;
                }}> -->
                <Button on:click={() => submitRental(listing)}>
                    rent Domain
                </Button>
            </Card.Footer>
        </Card.Container>
        {/if}
    {/each}
{:else}
     <!-- else content here -->
{/if}