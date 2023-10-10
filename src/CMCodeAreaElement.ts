import html from "./lib/html.js";
import css from "./lib/css.js";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {
  Compartment,
  EditorState,
  Extension,
  Transaction,
} from "@codemirror/state";
import {
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
} from "@codemirror/language";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import CMTransactionEvent from "./CMTransactionEvent.js";
import CMSelectionChangeEvent from "./CMSelectionChangeEvent.js";
import upgradeProperty from "./lib/upgradeProperty.js";

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
    #root {
      border: solid 1px rgb(221, 221, 221);
    }
    .cm-editor {
      height: 100%;
      max-height: 100%;
    }
    .cm-scroller {
      overflow: auto;
    }
  `;
  #internals: ElementInternals & { shadowRoot: ShadowRoot };
  #editorView: EditorView;
  #addedExtensions = new Set<Extension>();
  #addedExtensionCompartment = new Compartment();
  constructor() {
    super();
    this.#internals = this.attachInternals() as any;
    this.attachShadow({ mode: "open" });
    this.#internals.shadowRoot.adoptedStyleSheets.push(
      CMCodeAreaElement.#sheet,
    );
    this.#internals.shadowRoot.replaceChildren(html` <div id="root"></div> `);
    const root = this.#internals.shadowRoot.getElementById("root")!;
    this.#editorView = new EditorView({
      dispatch: this.#editorViewDispatch,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
        this.#addedExtensionCompartment.of([]),
      ],
      parent: root,
    });
    upgradeProperty(this, "codeLang");
  }
  get editorView() {
    return this.#editorView;
  }
  get value() {
    return this.editorView.state.doc.toString();
  }
  set value(value) {
    this.editorView.dispatch({
      changes: [
        { from: 0, to: this.editorView.state.doc.length, insert: value },
      ],
    });
  }
  #editorViewDispatch = (tx: Transaction) => {
    if (tx.docChanged) {
      tx.changes.iterChanges(() => {});
      console.log("Changed!", tx.changes);
    }
    if (tx.selection) {
      console.log("Selection!", tx.selection);
    }
    this.#editorView.update([tx]);
  };
  connectedCallback() {
  }
}
