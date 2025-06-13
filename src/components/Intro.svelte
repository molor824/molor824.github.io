<script lang="ts">
  import type { Attachment } from "svelte/attachments";

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

  let hovering = false;

  const canvasAttachment: Attachment<HTMLCanvasElement> = (canvas) => {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(
        `Vertex shader failed:\n${gl.getShaderInfoLog(vertexShader)}`
      );
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(
        `Fragment shader failed:\n${gl.getShaderInfoLog(fragmentShader)}`
      );
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link failed:\n${gl.getProgramInfoLog(program)}`);
    }
    gl.useProgram(program);

    const rgbSeperationUniform = gl.getUniformLocation(
      program,
      "rgbSeperation"
    );
    const rgbBlendUniform = gl.getUniformLocation(program, "rgbBlend");

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas) {
          const rect = entry.contentRect;
          canvas.width = rect.width;
          canvas.height = rect.height;
          gl.viewport(0, 0, rect.width, rect.height);
        }
      }
    });

    observer.observe(canvas);

    let previousTime = performance.now();
    let spread = 0;
    let strength = 20;

    function render(time: number) {
      if (!gl) return;

      let deltams = time - previousTime;
      previousTime = time;
      let delta = deltams / 1000;

      let targetSpread = hovering ? 1 : 0;
      spread += (targetSpread - spread) * (1 - Math.exp(-delta * strength));

      gl.uniform3fv(
        rgbSeperationUniform,
        [0, 0, 0].map(() => spread / 8)
      );
      gl.uniform3fv(
        rgbBlendUniform,
        [0, 0, 0].map(() => Math.max(1 - spread * 2, 0))
      );

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6 * 3);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      observer.disconnect();
    };
  };
</script>

<canvas
  {@attach canvasAttachment}
  class={_class}
  onmouseenter={() => (hovering = true)}
  onmouseleave={() => (hovering = false)}
></canvas>
