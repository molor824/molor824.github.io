import FadeIn from "./FadeIn";
import Pfp from "./Pfp";
import ScrollTexts from "./ScrollTexts";
import Tab from "./Tab";

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

function Seperator() {
  return <div className="w-full h-[1px] bg-white" />;
}

function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 items-center">
      <FadeIn className="self-stretch text-center flex flex-col items-center gap-2 pt-[100px]">
        <section className="flex flex-col gap-4 items-center" id="home">
          <Pfp />
          <h1 className="text-6xl text-primary">Molor Margad-Erdene</h1>
          <div className="text-xl">
            Computer science student at{" "}
            <a
              className="text-blue-200 transition-colors hover:text-blue-300 hover:underline"
              href="http://elearn.nmct.edu.mn"
              target="_blank"
            >
              New Mongolia College of Technology
            </a>
            <br />
            Aspiring software/hardware engineer with various interests in{" "}
            <ScrollTexts
              className="text-blue-300 font-bold"
              texts={[
                "Full stack",
                "Computer Graphics",
                "IoT & Robotics",
                "Image Processing",
              ]}
            />
          </div>
        </section>
      </FadeIn>
      <FadeIn className="w-full" fadeDelay={100}>
        <Seperator />
      </FadeIn>
      <section className="flex flex-col gap-4 items-center" id="projects">
        <FadeIn className="flex flex-col items-center gap-2" fadeDelay={200}>
          <h1 className="text-4xl text-primary font-bold">Projects</h1>
          <Tab
            tabs={PROJECTS.webdev.map((p) => p.name)}
            contents={PROJECTS.webdev.map((p) => p.description)}
          />
        </FadeIn>
      </section>
    </main>
  );
}
export default Home;
