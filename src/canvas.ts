export default function setup(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) {
    canvas.parentElement?.removeChild(canvas);
    return;
  }
}
