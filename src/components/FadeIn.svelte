<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  let {
    children,
    fadeDuration,
    fadeDelay,
    class: className,
  }: {
    children: () => any;
    fadeDuration?: number;
    fadeDelay?: number;
    class?: string;
  } = $props();

  let fadeIn = $state(false);

  let observer: IntersectionObserver | undefined;
  let element: HTMLElement | undefined;
  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            fadeIn = true;
          }, fadeDelay ?? 0);
          observer?.unobserve(element!);
          break;
        }
      }
    });
    observer.observe(element!);
  });
  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div
  bind:this={element}
  class={twMerge(
    `transition-all ease-out ${
      fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100%]"
    }`,
    className
  )}
  style:transition-duration="{fadeDuration ?? 500}ms"
>
  {@render children?.()}
</div>
