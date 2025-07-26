<script lang="ts">
  import FadeIn from "./FadeIn.svelte";
  import Pfp from "./Pfp.svelte";
  import ScrollTexts from "./ScrollTexts.svelte";
  import Tab from "./Tab.svelte";
  import TabContent from "./TabContent.svelte";
  import TabContents from "./TabContents.svelte";
  import TabHeader from "./TabHeader.svelte";
  import TabHeaders from "./TabHeaders.svelte";

  const PROJECTS = {
    webdev: [
      {
        name: "Yomimasho",
        description:
          "Full stack web application for users to learn and teach Japanese through stories.",
      },
      {
        name: "Team Manager",
        description:
          "Full stack web application for teams to manage project tasks.",
      },
    ],
    computerGraphics: [
      {
        name: "Marching Cube",
        description:
          "Marching cube algorithm computed in real-time using compute shader. Allows you to terraform and generate terrains for games and more!",
      },
      {
        name: "Voxel Renderer",
        description:
          "Voxel renderer that renders voxel by raymarching, completely removing a mesh generation stage, allowing for more voxel resolution with minimal cost!",
      },
    ],
    gameDev: [
      {
        name: "Fps Game",
        description:
          "Prototype game with procedural recoil animation, resulting in more realistic recoil system.",
      },
      {
        name: "Portal",
        description: "Prototype of accurate portal rendering in Unity.",
      },
    ],
    programming: [
      {
        name: "Lox Interpreter",
        description:
          "A basic tree walk-in interpreter from Crafting Interpreters book.",
      },
      {
        name: "Meteorite Engine",
        description:
          "An open source game engine with simple object oriented implementation and powerful OpenGL rendering",
      },
      {
        name: "Rasterizer",
        description: "Software rasterizing algorithm with depth testing.",
      },
    ],
    electronics: [
      {
        name: "MBP32",
        description:
          "MBP32 (Molor's Basic Processor 32bit) is a RISC-V 32bit microprocessor design with a custom ISA made in logisim-evolution!",
      },
    ],
  };
</script>

{#snippet seperator()}
  <div class="w-full h-[1px] bg-white"></div>
{/snippet}

<main class="container mx-auto flex flex-col gap-4 items-center">
  <FadeIn
    class="self-stretch text-center flex flex-col items-center gap-2 pt-[100px]"
  >
    <section class="flex flex-col gap-4 items-center" id="home">
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
        <ScrollTexts
          class="text-blue-300 font-bold"
          texts={[
            "Full stack",
            "Computer Graphics",
            "IoT & Robotics",
            "Image Processing",
          ]}
        />
      </p>
    </section>
  </FadeIn>
  <FadeIn class="w-full" fadeDelay={100}>
    {@render seperator()}
  </FadeIn>
  <section class="flex flex-col gap-4 items-center" id="projects">
    <FadeIn class="flex flex-col items-center gap-2" fadeDelay={200}>
      <h1 class="text-4xl text-primary font-bold">Projects</h1>
    </FadeIn>
  </section>
</main>
