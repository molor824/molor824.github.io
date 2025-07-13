<script lang="ts">
  import { getContext, type Snippet } from "svelte";

  const { children, value }: { children?: Snippet; value: string } = $props();
  const tab = getContext("tab") as { currentTab: () => string };
</script>

{#if tab.currentTab() === value}
  {@render children?.()}
{/if}
