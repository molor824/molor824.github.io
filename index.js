import { pfp } from "./pfp.js";

const pfpCanvas = document.getElementById("pfp-canvas");

pfp(pfpCanvas).catch(error => {
  console.error(error);
  pfpCanvas.remove();
});

const projectTemplate = document.getElementById("project");

customElements.define("project-li", class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    /** @type{HTMLElement} */
    const template = document.importNode(projectTemplate.content, true);
    const name = template.querySelector(".project-name");
    const desc = template.querySelector(".project-desc");

    name.innerText = this.getAttribute("name");
    name.href = this.getAttribute("href");

    desc.childNodes.forEach(node => node.remove());
    desc.append(...this.childNodes);

    this.append(template);
  }
});

customElements.define("projects-list", class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let children = [...this.children];
    console.log(children);
    for (let i = 1; i < children.length; i++) {
      const sep = document.createElement("div");
      sep.classList.add("minor-sep-line");
      this.insertBefore(sep, children[i]);
    }
  }
});
