import { LitElement } from "lit"

type Constructable<T = Record<string, unknown>> = new (...args: any[]) => T

export function DraftComponentMixin<T extends Constructable<LitElement>>(superClass: T): T {
  class DraftComponent extends superClass {
    private static _warningLogged = false

    connectedCallback() {
      super.connectedCallback()

      if (process.env.NODE_ENV !== "development" && !DraftComponent._warningLogged) {
        // eslint-disable-next-line no-console
        console.warn(
          `NORD: %c${this.localName}%c should not be used in production, as it is in draft status.`,
          "font-weight:bold",
          "font-weight:normal"
        )
        DraftComponent._warningLogged = true
      }
    }
  }

  return DraftComponent
}
