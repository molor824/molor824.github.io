const id = document.getElementById.bind(document);
const query = document.querySelector.bind(document);
const body = document.body;

const btnColors = {
  "btn-white": null,
  "btn-red": { bg: "--red-bg-color", text: "--red-text-color" },
  "btn-green": { bg: "--green-bg-color", text: "--green-text-color" },
  "btn-blue": { bg: "--blue-bg-color", text: "--blue-text-color" },
};

Object.entries(btnColors).forEach(([btnId, props]) => id(btnId).addEventListener("click", () => {
  if (props) {
    body.style.setProperty("--background-color", `var(${props.bg})`);
    body.style.setProperty("--text-color", `var(${props.text})`);
  } else {
    body.style.removeProperty("--background-color");
    body.style.removeProperty("--text-color");
  }
}));
