<script lang="ts">
    import {Button, htmlmode, htmldark, htmllight, prefersdark, darkmode} from "@kahi-ui/framework";
    import {Moon, Sun} from "lucide-svelte";

    const mode = htmlmode();

    const isDarkMode = darkmode();

    function onModeClick() {
        $mode = $isDarkMode ? "light" : "dark";
    }

</script>

<Button variation="clear" palette="{$isDarkMode ? "light" : "dark"}" on:click={onModeClick}>
    {#if $isDarkMode}
        <Sun></Sun>
    {:else}
        <Moon></Moon>
    {/if}
</Button>
