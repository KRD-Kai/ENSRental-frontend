<script lang="ts">
    import { ensMarket, baseRegistrar} from "$lib/stores/ethers";
    import { Card, Text, Box, Code, Overlay, Blockquote, Button, NumberInput } from "@kahi-ui/framework";
    import { parseUnits } from "ethers/lib/utils";
    import dayjs from "dayjs";
    import { BigNumber, utils } from "ethers";
    
    export let logic_state;
    export let labelName;
    let price;
    let days;
    
    let listTx: any = null;
    async function submitListing() {
        let x = utils.keccak256(utils.toUtf8Bytes(labelName))
        console.log(labelName)
        $ensMarket.listToken(
            "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85", 
            BigNumber.from(x), 
            BigNumber.from(price), 
            BigNumber.from(days)
        ).then(tx => {
            listTx = tx;
            tx.wait(1).then(tx => {
                listTx = tx;
                console.log(tx)
            })
        }).catch(console.error);
    }
    
    </script>
    
    <Overlay.Container
        logic_id="1"
        bind:logic_state
        dismissible
    >
        <Overlay.Backdrop />
    
        <Overlay.Section>
            <Card.Container max_width="50" sizing="large">
                {#if listTx === null}
                    <Card.Header >Create listing</Card.Header>
                    <Card.Section>
                        <Text is="small">Rental price</Text>
                        <NumberInput 
                            min={0}
                            bind:value={price}
                        />
                        <Text is="small">Rental period (days)</Text>
                        <NumberInput 
                            min={0}
                            bind:value={days}
                        />
                    </Card.Section>
    
                    <Card.Footer>
                        <Overlay.Button
                            palette="inverse"
                            variation="clear"
                        >
                            Cancel
                        </Overlay.Button>
    
                        <Button
                            palette="affirmative" 
                            on:click={submitListing}
                        >
                            Confirm Listing
                        </Button>
                    </Card.Footer>
                {:else if listTx instanceof Error}
                    <Text palette="negative">Error</Text>
                    <Overlay.Button
                            palette="inverse"
                            variation="clear"
                        >
                            Cancel
                    </Overlay.Button>
                {/if}
            </Card.Container>
        </Overlay.Section>
    </Overlay.Container>
    