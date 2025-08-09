import type { PropsWithChildren } from "react";
import FadeIn from "./FadeIn";
import Pfp from "./Pfp";
import ScrollTexts from "./ScrollTexts";
import { twMerge } from "tailwind-merge";
import Slider, { Slide } from "./Slider";
import UnorderedList, { ListItem } from "./UnorderedList";

const PROJECTS = {
  webdev: [
    {
      name: "Yomimasho",
      description:
        "Full stack web application for users to learn and teach Japanese through stories.",
      features: [
        "Click on words to understand meaning as you read a story",
        "Editor to write a story and teach others Japanese",
        "Click on words to see their meanings, how it's used in this context etc",
        "Add words to flashcard list and review them later",
      ],
      pictures: ["/yomimasho-ss1.png", "/yomimasho-ss2.png"],
    },
    {
      name: "Team Manager",
      description:
        "Full stack web application for teams to manage project tasks.",
      features: [
        "Create team and manage tasks",
        "See task deadlines and schedules as a team member",
        "Organize tasks by progress and record start and completion time of tasks",
      ],
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
        "Raymarching based voxel renderer. Works on extreme high detail voxels with minimal performance loss!",
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
    {
      name: "Tetry",
      description:
        "Tetris written according to the specifications, in bevy game engine.",
    },
    {},
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
  return <div className="w-full h-[2px] bg-white/20" />;
}
function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={twMerge("rounded-xl p-4", className)}>{children}</div>;
}

function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 items-center">
      <section id="home">
        <FadeIn className="flex flex-col gap-4 items-center text-center pt-[100px]">
          <Pfp />
          <h1 className="text-6xl font-normal">Molor Margad-Erdene</h1>
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
        </FadeIn>
      </section>
      <FadeIn className="w-full" fadeDelay={100}>
        <Seperator />
      </FadeIn>
      <section className="self-stretch" id="projects">
        <FadeIn className="flex flex-col items-stretch gap-2" fadeDelay={200}>
          <h1>Projects</h1>
          <Card className="bg-background1 flex flex-col gap-8">
            <h2>Web development</h2>
            <Seperator />
            {PROJECTS.webdev.map((project) => (
              <div className="flex gap-4" key={project.name}>
                <div className="flex flex-col gap-4 flex-1 text-lg">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {project.features && (
                    <>
                      <br />
                      <h3 className="text-xl text-start">Features</h3>
                      <UnorderedList>
                        {project.features.map((feature, i) => (
                          <ListItem key={i}>{feature}</ListItem>
                        ))}
                      </UnorderedList>
                    </>
                  )}
                </div>
                {project.pictures && (
                  <Slider className="grow aspect-[16/9] flex-1">
                    {project.pictures.map((picture, i) => (
                      <Slide key={i}>
                        <img src={picture} />
                      </Slide>
                    ))}
                  </Slider>
                )}
              </div>
            ))}
          </Card>
        </FadeIn>
      </section>
    </main>
  );
}
export default Home;
