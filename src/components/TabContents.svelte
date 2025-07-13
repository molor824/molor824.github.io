<script lang="ts">
  import type { Snippet } from "svelte";

  const { children }: { children?: Snippet } = $props();
</script>

<div class="self-center">
  {@render children?.()}
</div>
