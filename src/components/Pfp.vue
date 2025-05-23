<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watchEffect,
} from "vue";

const { size } = defineProps<{
  size: number;
}>();

const points = Array.from({ length: 6 }, (_, i) => {
  const radius = i % 2 === 0 ? 0.6 : 0.75;
  const angle = -(i * Math.PI) / 3 + Math.PI * 0.5;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
});
const colors = Array.from({ length: 6 }, (_, i) => {
  const r = i == 0 || i == 5 || i == 1 ? 1.0 : 0.0;
  const g = i == 1 || i == 2 || i == 3 ? 1.0 : 0.0;
  const b = i == 3 || i == 4 || i == 5 ? 1.0 : 0.0;
  return { r, g, b };
});

const canvas = useTemplateRef("canvas");
const vertexShaderSource = `#version 300 es
precision mediump float;
out vec3 v_color;
vec2 points[6] = vec2[](${points
  .map((point) => `vec2(${point.x}, ${point.y})`)
  .join(", ")});
vec3 colors[6] = vec3[](${colors
  .map((color) => `vec3(${color.r}, ${color.g}, ${color.b})`)
  .join(", ")});
void main() {
  if (gl_VertexID == 0) {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    v_color = vec3(1.0, 1.0, 1.0);
    return;
  }
  int id = (gl_VertexID - 1) % 6;
  v_color = colors[id];
  gl_Position = vec4(points[id], 0.0, 1.0);
}
`;
const fragmentShaderSource = `#version 300 es
precision mediump float;
in vec3 v_color;
out vec4 frag_color;
void main() {
  frag_color = vec4(v_color, 1.0);
}
`;

const context = ref<WebGL2RenderingContext | null>(null);
const program = ref<WebGLProgram | null>(null);

watchEffect(() => {
  if (!canvas.value) return;

  const ctx = context.value;
  if (!ctx) return;

  canvas.value.width = size;
  canvas.value.height = size;

  ctx.viewport(0, 0, size, size);
  ctx.clearColor(0.0, 0.0, 0.0, 0.0);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
  ctx.drawArrays(ctx.TRIANGLE_FAN, 0, 8);
});

onMounted(() => {
  const ctx = canvas.value!.getContext("webgl2");
  if (!ctx) {
    throw new Error("WebGL not supported");
  }

  const vertexShader = ctx.createShader(ctx.VERTEX_SHADER)!;
  ctx.shaderSource(vertexShader, vertexShaderSource);
  ctx.compileShader(vertexShader);
  if (!ctx.getShaderParameter(vertexShader, ctx.COMPILE_STATUS)) {
    throw new Error(
      "Error compiling vertex shader: " + ctx.getShaderInfoLog(vertexShader)
    );
  }
  const fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER)!;
  ctx.shaderSource(fragmentShader, fragmentShaderSource);
  ctx.compileShader(fragmentShader);
  if (!ctx.getShaderParameter(fragmentShader, ctx.COMPILE_STATUS)) {
    throw new Error(
      "Error compiling fragment shader: " + ctx.getShaderInfoLog(fragmentShader)
    );
  }
  const program = ctx.createProgram()!;
  ctx.attachShader(program, vertexShader);
  ctx.attachShader(program, fragmentShader);
  ctx.linkProgram(program);

  ctx.deleteShader(vertexShader);
  ctx.deleteShader(fragmentShader);

  if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
    throw new Error("Error linking program: " + ctx.getProgramInfoLog(program));
  }
  ctx.useProgram(program);

  context.value = ctx;
});
onBeforeUnmount(() => {
  const ctx = context.value;
  if (!ctx) return;

  ctx.deleteProgram(program.value);
});
</script>

<template>
  <canvas
    ref="canvas"
    :width="size"
    :height="size"
    :style="{ width: `${size}px`, height: `${size}px` }"
  ></canvas>
</template>
