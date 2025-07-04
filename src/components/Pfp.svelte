<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import { twMerge } from "tailwind-merge";

  const { class: _class }: { class?: string } = $props();

  const HUE_HEXAGON = [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
    [1, 0, 1],
  ];
  const SECTION_VERTICES = [
    [0, 0],
    [(150 * Math.PI) / 180, 1],
    [Math.PI / 2, 0.8],
    [0, 0],
    [Math.PI / 2, 0.8],
    [(30 * Math.PI) / 180, 1],
  ].map(([radian, angle]) => [
    Math.cos(radian) * angle,
    Math.sin(radian) * angle,
  ]);
  const vertexShaderSrc = `#version 300 es
precision mediump float;
uniform vec3 rgbSeperation;
uniform vec3 rgbBlend;

out vec3 vColor;

const float SCALE = 0.8;
const vec3 HUE_HEXAGON[] = vec3[6](${HUE_HEXAGON.map(([r, g, b]) => `vec3(${r},${g},${b})`).join(",")});
const vec2 SECTION_VERTICES[] = vec2[6](${SECTION_VERTICES.map(([x, y]) => `vec2(${x},${y})`).join(",")});

void main() {
    int section = gl_VertexID / 6 % 3;
    int vertex_index = gl_VertexID % 6;
    float section_radian = float(section) * ${-(Math.PI * 2) / 3};
    float cos_radian = cos(section_radian);
    float sin_radian = sin(section_radian);
    vec2 vertex = SECTION_VERTICES[vertex_index] * SCALE;
    mat2 rotator = mat2(cos_radian, sin_radian, -sin_radian, cos_radian);

    vec3 realVertexColor = HUE_HEXAGON[section * 2];
    vec3 blendedVertexColor = realVertexColor;

    if (vertex_index == 0 || vertex_index == 3) {
        blendedVertexColor = vec3(1);
    } else if (vertex_index == 1) {
        blendedVertexColor = HUE_HEXAGON[(section * 2 - 1 + 6) % 6];
    } else if (vertex_index == 5) {
        blendedVertexColor = HUE_HEXAGON[(section * 2 + 1) % 6];
    }
    vColor = mix(realVertexColor, blendedVertexColor, rgbBlend[section]);
    gl_Position = vec4(rotator * (vertex + vec2(0, rgbSeperation[section])), 0, 1);
}
`;
  const fragmentShaderSrc = `#version 300 es
precision mediump float;
in vec3 vColor;
out vec4 outColor;

void main() {
    outColor = vec4(vColor, 1);
}`;
  console.log(vertexShaderSrc, fragmentShaderSrc);

  let hoveringPosition: { x: number; y: number } | null = null;

  const canvasAttachment: Attachment<HTMLCanvasElement> = (canvas) => {
    let gl = canvas.getContext("webgl2");
    if (!gl) {
      return;
    }

    let vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(
        `Vertex shader failed:\n${gl.getShaderInfoLog(vertexShader)}`
      );
    }

    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(
        `Fragment shader failed:\n${gl.getShaderInfoLog(fragmentShader)}`
      );
    }

    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link failed:\n${gl.getProgramInfoLog(program)}`);
    }
    gl.useProgram(program);

    let rgbSeperationUniform = gl.getUniformLocation(program, "rgbSeperation");
    let rgbBlendUniform = gl.getUniformLocation(program, "rgbBlend");

    let observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas) {
          const rect = entry.contentRect;
          canvas.width = rect.width;
          canvas.height = rect.height;
          gl!.viewport(0, 0, rect.width, rect.height);
        }
      }
    });

    observer.observe(canvas);

    let previousTime: number;
    let spreads = [1, 1, 1];
    let strength = 15;
    let centerRadius = 20;

    function render(time: number) {
      if (!previousTime) {
        previousTime = time;
      }
      if (!gl) return;

      let deltams = time - previousTime;
      previousTime = time;
      let delta = deltams / 1000;

      let targetSpreads: number[];
      if (hoveringPosition) {
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dx = hoveringPosition.x - centerX;
        const dy = hoveringPosition.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(-dy, dx) * 180) / Math.PI;
        if (distance < centerRadius) {
          targetSpreads = [1, 1, 1];
        } else {
          targetSpreads = [
            angle > 20 && angle < 160,
            angle > -100 && angle < 40,
            angle > 140 || angle < -80,
          ].map((v) => (v ? 1 : 0));
        }
      } else {
        targetSpreads = [0, 0, 0];
      }

      spreads = spreads.map(
        (spread, i) =>
          spread +
          (targetSpreads[i] - spread) * (1 - Math.exp(-strength * delta))
      );

      gl.uniform3fv(
        rgbSeperationUniform,
        spreads.map((spread) => spread / 8)
      );
      gl.uniform3fv(
        rgbBlendUniform,
        spreads.map((spread) => 1 - spread * spread)
      );

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6 * 3);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    return () => {
      gl!.deleteProgram(program);
      gl!.deleteShader(vertexShader);
      gl!.deleteShader(fragmentShader);
      observer.disconnect();
      gl = null;
    };
  };
</script>

<canvas
  {@attach canvasAttachment}
  class={twMerge("rounded-full aspect-square h-[200px]", _class)}
  onmousemove={(event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    hoveringPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }}
  onmouseleave={() => (hoveringPosition = null)}
></canvas>
