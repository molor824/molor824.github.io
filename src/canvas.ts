export default function setup(canvasContainer: HTMLElement) {
  const canvas = document.createElement("canvas");
  canvasContainer.appendChild(canvas);

  const observer = new ResizeObserver((entries, _) => {
    for (const entry of entries) {
      if (entry.target === canvasContainer) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
        return;
      }
    }
  });
  observer.observe(canvasContainer);

  const context = canvas.getContext("2d");
  if (!context) {
    canvas.parentElement?.removeChild(canvas);
    return;
  }

  let lastTime = 0;
  let rotation = 0;

  const loop = (time: number) => {
    let delta = (time - lastTime) / 1000;
    lastTime = time;

    rotation += 2 * delta;

    context.resetTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.translate(20, 20);
    context.rotate(rotation);
    context.translate(-20, -20);
    context.fillRect(10, 10, 20, 20);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}
