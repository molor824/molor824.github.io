<script lang="ts">
  import FadeIn from "./FadeIn.svelte";
</script>

<section class="flex flex-col gap-4 items-center" id="home">
  <FadeIn class="text-center flex flex-col items-center gap-2">
    <div class="overflow-hidden rounded-full w-32 duration-500 ease-out">
      <img src="/pfp.png" alt="My profile" />
    </div>
    <h1 class="text-6xl text-primary duration-500 ease-out">
      Molor Margad-Erdene
    </h1>
    <p class="text-xl">
      Computer science student at
      <a
        class="text-blue-200 transition-colors hover:text-blue-300 hover:underline"
        href="http://elearn.nmct.edu.mn"
        target="_blank">New Mongolia College of Technology</a
      >
    </p>
  </FadeIn>
</section>
