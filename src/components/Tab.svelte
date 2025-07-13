<script lang="ts">
  import { setContext, type Snippet } from "svelte";

  const { children }: { children?: Snippet } = $props();

  let currentTab = $state("");
  setContext("tab", {
    currentTab: () => currentTab,
    setCurrentTab: (value: string) => (currentTab = value),
  });
</script>

<div class="flex flex-col gap-4">
  {@render children?.()}
</div>
