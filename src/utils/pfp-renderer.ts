export class PfpRenderer {
  program: WebGLProgram;
  gl: WebGL2RenderingContext;
  constructor(gl: WebGL2RenderingContext) {
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
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(
        "Error compiling vertex shader: " + gl.getShaderInfoLog(vertexShader)
      );
    }
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(
        "Error compiling fragment shader: " +
          gl.getShaderInfoLog(fragmentShader)
      );
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        "Error linking program: " + gl.getProgramInfoLog(program)
      );
    }
    gl.useProgram(program);

    this.program = program;
    this.gl = gl;
  }
  render(width: number, height: number) {
    this.gl.viewport(0, 0, width, height);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 8);
  }
  unmount() {
    this.gl.deleteProgram(this.program);
    this.gl = this.program = null!;
  }
}
