precision mediump float;

attribute vec3 a_color0;
attribute vec3 a_color1;
attribute vec2 a_pos0;
attribute vec2 a_pos1;

varying vec4 v_color;

uniform float u_mix;

void main() {
  gl_Position = vec4(mix(a_pos0, a_pos1, u_mix), 0.0, 1.0);
  v_color = vec4(mix(a_color0, a_color1, u_mix), 1.0);
}
