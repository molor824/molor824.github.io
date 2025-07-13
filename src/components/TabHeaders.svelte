<script lang="ts">
  import type { Snippet } from "svelte";

  const { children }: { children?: Snippet } = $props();
</script>

<nav class="flex gap-4 items-center">
  {@render children?.()}
</nav>
