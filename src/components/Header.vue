<script setup lang="ts">
const ROUTES = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
</script>

<template>
  <header
    class="backdrop:blur sticky top-0 flex gap-2 px-8 justify-end items-center"
  >
    <router-link
      v-for="route of ROUTES"
      :class="`p-2 text-white/60 transition-all hover:text-white`"
      :to="route.href"
      >{{ route.name }}</router-link
    >
  </header>
</template>
