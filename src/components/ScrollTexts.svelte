<script lang="ts">
  const {
    texts = [],
    scrollDuration = 3000,
  }: {
    texts?: string[];
    scrollDuration?: number;
  } = $props();
  let currentIndex = $state(0);
  let nextIndex = $derived(currentIndex + (1 % texts.length));

  $effect(() => {
    const interval = setInterval(() => {
      currentIndex = nextIndex;
      nextIndex = (currentIndex + 1) % texts.length;
    }, scrollDuration); // Change text every 3 seconds

    return () => clearInterval(interval);
  });
</script>

<span class="transition-all"></span>
