<script lang="ts">
  import type { Component } from "svelte";

  const {
    tabs = {},
  }: {
    tabs?: Record<string, () => Component>;
  } = $props();

  let currentTab = $state<string>("");
  let CurrentComponent = $derived(tabs[currentTab]?.());
</script>

<nav class="flex gap-4">
  {#each Object.keys(tabs) as tab (tab)}
    <button onclick={() => (currentTab = tab)}>{tab}</button>
  {/each}
</nav>

<CurrentComponent></CurrentComponent>
