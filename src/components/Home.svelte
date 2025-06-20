<script lang="ts">
  import FadeIn from "./FadeIn.svelte";
  import Pfp from "./Pfp.svelte";
</script>

{#snippet seperator()}
  <div class="w-full h-[1px] bg-white"></div>
{/snippet}

<section
  class="container mx-auto flex flex-col gap-4 items-center relative"
  id="home"
>
  <FadeIn
    class="self-stretch text-center flex flex-col items-center gap-2 pt-[100px]"
  >
    <Pfp></Pfp>
    <h1 class="text-6xl text-primary">Molor Margad-Erdene</h1>
    <p class="text-xl">
      Computer science student at
      <a
        class="text-blue-200 transition-colors hover:text-blue-300 hover:underline"
        href="http://elearn.nmct.edu.mn"
        target="_blank">New Mongolia College of Technology</a
      >
      <br />
      Aspiring software/hardware engineer with various interests in
    </p>
  </FadeIn>
  <FadeIn class="w-full" fadeDelay={100}>
    {@render seperator()}
  </FadeIn>
  <FadeIn class="flex flex-col items-center gap-2" fadeDelay={200}>
    <h1 class="text-4xl text-primary font-bold">Projects</h1>
  </FadeIn>
</section>
