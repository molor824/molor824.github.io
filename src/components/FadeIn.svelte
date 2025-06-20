<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import { twMerge } from "tailwind-merge";

  let {
    children,
    fadeDuration,
    fadeDelay,
    distance,
    class: className,
  }: {
    children?: () => any;
    fadeDuration?: number;
    fadeDelay?: number;
    distance?: number;
    class?: string;
  } = $props();

  let fadeIn = $state(false);

  const attachment: Attachment<HTMLDivElement> = (el) => {
    let observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            fadeIn = true;
          }, fadeDelay ?? 0);
          observer?.unobserve(el);
          break;
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  };
</script>

<div
  {@attach attachment}
  class={twMerge(`transition-all ease-out`, className)}
  style:transition-duration="{fadeDuration ?? 500}ms"
  style:opacity={fadeIn ? 1 : 0}
  style:transform={fadeIn ? "translateY(0)" : `translateY(${distance ?? 50}px)`}
>
  {@render children?.()}
</div>
