<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  let {
    children,
    fadeDuration,
    fadeDelay,
  }: {
    children: () => any;
    fadeDuration?: number;
    fadeDelay?: number;
  } = $props();

  let fadeIn = $state(false);

  let observer: IntersectionObserver;
  let element: HTMLElement;
  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            fadeIn = true;
          }, fadeDelay ?? 0);
          observer.unobserve(element);
          break;
        }
      }
    });
    observer.observe(element);
  });
  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div
  bind:this={element}
  class="transition-all ease-out {fadeIn
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-[100%]'}"
  style:transition-duration="{fadeDuration ?? 500}ms"
>
  {@render children?.()}
</div>
