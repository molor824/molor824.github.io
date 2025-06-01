<script lang="ts">
  import FadeIn from "./FadeIn.svelte";
</script>

<section class="flex flex-col gap-2 items-center" id="home">
  <FadeIn>
    <div class="overflow-hidden rounded-full w-32 duration-500 ease-out">
      <img src="/pfp.png" alt="My profile" />
    </div>
  </FadeIn>
  <FadeIn fadeDelay={200}>
    <h1 class="text-6xl text-primary duration-500 ease-out">
      Molor Margad-Erdene
    </h1>
  </FadeIn>
</section>
