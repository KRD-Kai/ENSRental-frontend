<script lang="ts">
	import { account, provider, walletBalance } from '$lib/stores/ethers'

</script>

{#if $account && $walletBalance}
    Welcome {$account}
    <br>
    Your balance is {$walletBalance}
{/if}


