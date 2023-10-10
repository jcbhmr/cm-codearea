import CMCodeAreaElement from "./CMCodeAreaElement.js";

declare global {
  interface HTMLElementTagNameMap {
    "cm-codearea": CMCodeAreaElement;
  }
}
customElements.define("cm-codearea", CMCodeAreaElement);
