import { pfp } from "./pfp.js";

const pfpCanvas = document.getElementById("pfp-canvas");

pfp(pfpCanvas).catch(error => {
  console.error(error);
  pfpCanvas.remove();
});
