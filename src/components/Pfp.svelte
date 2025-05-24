<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { PfpRenderer } from "../utils/pfp-renderer";

  type Props = { size: number; class: string };

  let { size, class: cls }: Props = $props();

  let renderer = $state<PfpRenderer | null>(null);
  let canvas: HTMLCanvasElement | null = null;

  onMount(() => {
    let gl = canvas?.getContext("webgl2");
    if (!gl) {
      console.error("WebGL2 not supported");
      return;
    }
    renderer = new PfpRenderer(gl);
  });
  $effect(() => {
    if (renderer) {
      renderer.render(size, size);
    }
  });
  onDestroy(() => {
    if (renderer) {
      renderer.unmount();
      renderer = null;
    }
  });
</script>

<canvas
  bind:this={canvas}
  width={size}
  height={size}
  style:width="{size}px"
  style:height="{size}px"
  class={cls}
></canvas>
