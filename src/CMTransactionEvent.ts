import { Transaction } from "@codemirror/state";

interface CMTransactionEventInit extends EventInit {
  transaction?: Transaction;
}

class CMTransactionEvent extends Event {
  readonly transaction: Transaction | null;
  constructor(type: string, options: CMTransactionEventInit) {
    super(type, options);
    this.transaction = options?.transaction ?? null;
  }
}

export default CMTransactionEvent;
export { CMTransactionEventInit };
