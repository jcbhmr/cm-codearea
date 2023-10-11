import { basicSetup, EditorView } from "codemirror";
import { EditorState, Compartment, Text } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import upgradeProperty from "./lib/upgradeProperty.js";
import html from "./lib/html.js";
import css from "./lib/css.js";

export default class CMCodeAreaElement extends HTMLElement {
  static get formAssociated() {
    return true;
  }
  static get observedAttributes() {
    return ["codelang"];
  }
  static #sheet = css`
    :host {
      display: inline-block;
    }
    :host([hidden]) {
      display: none;
    }
    :host {
      width: 100%;
      height: 100%;
    }
    #slot {
      display: none;
    }
    #root {
      display: contents;
    }
    .cm-editor {
      height: 100%;
      max-height: 100%;
    }
    .cm-scroller {
      overflow: auto;
    }
  `;
  #internals = this.attachInternals();
  #shadowRoot = this.attachShadow({ mode: "closed" });
  #slot: HTMLSlotElement
  #root: HTMLDivElement;
  #readyState: "default" | "edited" = "default";
  #view: EditorView;
  constructor() {
    super();
    this.#shadowRoot.adoptedStyleSheets.push(CMCodeAreaElement.#sheet);
    this.#shadowRoot.replaceChildren(html`<slot id="slot"></slot><div id="root"></div>`);
    this.#slot = this.#shadowRoot.getElementById("slot")! as HTMLSlotElement
    this.#root = this.#shadowRoot.getElementById("root")! as HTMLDivElement;
    this.#slot.addEventListener("slotchange", () => {
      if (this.#readyState === "default") {
        this.value = this.defaultValue
      }
    })
    upgradeProperty(this, "codeLang");
  }
  get defaultValue() {
    const textNodes = Array.from(this.childNodes).filter(x => x instanceof Text)
    return textNodes.map(x => x.nodeValue).join("")
  }
  get value() {
    return this.#view.state.doc.toString()
  }
  set value(value) {
    const text = Text.of(value.split(/\r?\n/g))
    this.#view.state.doc.replace(0, this.#view.state.doc.length, text)
  }
  connectedCallback() {
    console.log(this.defaultValue)
    this.#view = new EditorView({
      doc: this.defaultValue,
      extensions: [
        basicSetup,
        javascript(),
      ],
      parent: this.#root
    })
  }
}
