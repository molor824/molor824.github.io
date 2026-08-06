/** @param {WebGLRenderingContext} gl */
function compileShader(gl, source, type) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    throw new Error(log);
  }

  return shader;
}

/** @param {WebGLRenderingContext} gl */
function createProgram(gl, ...shaders) {
  let program = gl.createProgram();
  for (const shader of shaders) {
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    throw new Error(log);
  }

  return program;
}

function fromPolar(deg, length) {
  const radian = deg * Math.PI / 180;
  return [Math.cos(radian) * length, Math.sin(radian) * length];
}

/** @param {number[]} v0
 * @param {number[]} v1
 */
function addVec(v0, v1) {
  return v0.map((v, i) => v + v1[i]);
}

const OUTER_RADIUS = 0.8;
const INNER_RADIUS = 0.7;

const OFFSET_RADIUS = 0.1;

const RED_OFFSET = fromPolar(90, OFFSET_RADIUS);
const GREEN_OFFSET = fromPolar(-30, OFFSET_RADIUS);
const BLUE_OFFSET = fromPolar(-150, OFFSET_RADIUS);

const RED_VERTICES = [
  fromPolar(150, OUTER_RADIUS),
  fromPolar(90, INNER_RADIUS),
  fromPolar(30, OUTER_RADIUS)
];
const GREEN_VERTICES = [
  fromPolar(30, OUTER_RADIUS),
  fromPolar(-30, INNER_RADIUS),
  fromPolar(-90, OUTER_RADIUS)
];
const BLUE_VERTICES = [
  fromPolar(-90, OUTER_RADIUS),
  fromPolar(-150, INNER_RADIUS),
  fromPolar(150, OUTER_RADIUS)
];

const VERTEX_DATA = new Float32Array([
  // closed form                 // open form
  // red
  1, 1, 1, 0, 0,                 1, 0, 0, ...RED_OFFSET,
  1, 0, 1, ...RED_VERTICES[0],   1, 0, 0, ...addVec(RED_VERTICES[0], RED_OFFSET),
  1, 0, 0, ...RED_VERTICES[1],   1, 0, 0, ...addVec(RED_VERTICES[1], RED_OFFSET),
  1, 1, 0, ...RED_VERTICES[2],   1, 0, 0, ...addVec(RED_VERTICES[2], RED_OFFSET),
  // green
  1, 1, 1, 0, 0,                 0, 1, 0, ...GREEN_OFFSET,
  1, 1, 0, ...GREEN_VERTICES[0], 0, 1, 0, ...addVec(GREEN_VERTICES[0], GREEN_OFFSET),
  0, 1, 0, ...GREEN_VERTICES[1], 0, 1, 0, ...addVec(GREEN_VERTICES[1], GREEN_OFFSET),
  0, 1, 1, ...GREEN_VERTICES[2], 0, 1, 0, ...addVec(GREEN_VERTICES[2], GREEN_OFFSET),
  // blue
  1, 1, 1, 0, 0,                 0, 0, 1, ...BLUE_OFFSET,
  0, 1, 1, ...BLUE_VERTICES[0],  0, 0, 1, ...addVec(BLUE_VERTICES[0], BLUE_OFFSET),
  0, 0, 1, ...BLUE_VERTICES[1],  0, 0, 1, ...addVec(BLUE_VERTICES[1], BLUE_OFFSET),
  1, 0, 1, ...BLUE_VERTICES[2],  0, 0, 1, ...addVec(BLUE_VERTICES[2], BLUE_OFFSET),
]);

console.log(VERTEX_DATA);

/** @param {HTMLCanvasElement} canvas */
export async function pfp(canvas) {
  const gl = canvas.getContext("webgl");

  const [vsSource, fsSource] = await Promise.all([
    "vertex.vs",
    "fragment.fs"
  ].map(url => fetch(url).then(res => res.text())));

  const vsShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
  const fsShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

  const program = createProgram(gl, vsShader, fsShader);

  gl.deleteShader(vsShader);
  gl.deleteShader(fsShader);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, VERTEX_DATA, gl.STATIC_DRAW);

  const mixLoc = gl.getUniformLocation(program, "u_mix");

  const closedColorAttr = gl.getAttribLocation(program, "a_color0");
  const openColorAttr = gl.getAttribLocation(program, "a_color1");
  const closedPosAttr = gl.getAttribLocation(program, "a_pos0");
  const openPosAttr = gl.getAttribLocation(program, "a_pos1");

  gl.vertexAttribPointer(closedColorAttr, 3, gl.FLOAT, false, 4 * 10, 0);
  gl.vertexAttribPointer(closedPosAttr, 2, gl.FLOAT, false, 4 * 10, 4 * 3);
  gl.vertexAttribPointer(openColorAttr, 3, gl.FLOAT, false, 4 * 10, 4 * 5);
  gl.vertexAttribPointer(openPosAttr, 2, gl.FLOAT, false, 4 * 10, 4 * 8);

  [closedColorAttr, openColorAttr, closedPosAttr, openPosAttr].forEach(attr => gl.enableVertexAttribArray(attr));

  gl.useProgram(program);

  let elapsed = 0;
  function update(current) {
    const dt = (current - elapsed) / 1000;
    elapsed = current;

    gl.uniform1f(mixLoc, -Math.cos(elapsed / 500) * 0.5 + 0.5);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 8, 4);

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
