<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  const {
    class: className,
    texts = [],
    switchInterval = 3000,
    scrollDuration = 500,
  }: {
    class?: string;
    texts?: string[];
    switchInterval?: number;
    scrollDuration?: number;
  } = $props();
  let currentIndex = $state(0);
  let nextIndex = $derived((currentIndex + 1) % texts.length);
  let scroll = $state(false);

  let interval: number;
  let currentTextWidth = $state(0);
  let currentTextHeight = $state(0);
  let nextTextWidth = $state(0);

  onMount(() => {
    interval = setInterval(() => {
      scroll = true;
      setTimeout(() => {
        scroll = false;
        currentIndex = nextIndex;
      }, scrollDuration);
    }, switchInterval);
  });
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div
  class={twMerge(
    "inline-block align-bottom relative overflow-hidden transition-all",
    className
  )}
  style:width="{scroll ? nextTextWidth : currentTextWidth}px"
  style:height="{currentTextHeight}px"
  style:transition-duration="{scrollDuration}ms"
>
  <div
    class="absolute top-0 left-0 text-start transition-all"
    style:transform="translateY({scroll ? -currentTextHeight : 0}px)"
    style:transition-duration="{scroll ? scrollDuration : 0}ms"
  >
    <div
      class="w-max"
      bind:offsetWidth={currentTextWidth}
      bind:offsetHeight={currentTextHeight}
    >
      {texts[currentIndex]}
    </div>
    <div class="w-max" bind:offsetWidth={nextTextWidth}>{texts[nextIndex]}</div>
  </div>
</div>
