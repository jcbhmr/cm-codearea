import { EditorSelection, Transaction } from "@codemirror/state";

interface CMSelectionChangeEventInit extends EventInit {
  transaction?: Transaction;
  selection?: EditorSelection;
}

class CMSelectionChangeEvent extends Event {
  readonly transaction: Transaction | null;
  readonly selection: EditorSelection | null;
  constructor(type: string, options: CMSelectionChangeEventInit) {
    super(type, options);
    this.transaction = options?.transaction ?? null;
    this.selection = options?.selection ?? null;
  }
}

export default CMSelectionChangeEvent;
export { CMSelectionChangeEventInit };
