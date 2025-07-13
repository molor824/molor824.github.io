<script lang="ts">
  import { getContext, type Snippet } from "svelte";

  const { children, value }: { children?: Snippet; value: string } = $props();
  const tab = getContext("tab") as {
    currentTab: () => string;
    setCurrentTab: (value: string) => void;
  };
</script>

<button onclick={() => tab.setCurrentTab(value)}>
  {@render children?.()}
</button>
