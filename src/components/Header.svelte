<script lang="ts">
  const ROUTES = [
    { name: "Home", path: "#" },
    { name: "Projects", path: "#projects" },
    { name: "Contact", path: "#contact" },
  ];
</script>

<header
  class="backdrop:blur sticky top-0 flex gap-2 px-8 justify-end items-center"
>
  {#each ROUTES as route}
    <a
      class="p-2 text-white/60 transition-all hover:text-white"
      href={route.path}
    >
      {route.name}
    </a>
  {/each}
</header>
