import { AsciiArt } from "./ascii_art.js";
import { Typewriter } from "./typewriter.js";
const introduction = document.getElementById('introduction');
const explosion = document.getElementById('explosion');
let ascii = new AsciiArt(document.getElementById('ascii art'), 40, 40);
explosion.onclick = (ev) => {
    ascii.run();
};
let typewriter = new Typewriter(introduction);
typewriter.run();
