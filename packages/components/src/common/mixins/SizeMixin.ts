/* eslint-disable max-classes-per-file */
import { LitElement } from "lit"
import { property } from "lit/decorators.js"

type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T

export declare class SizeMixinInterface {
  size: "s" | "m" | "l"
}

export function SizeMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<SizeMixinInterface> & T {
  class SizeElement extends superClass {
    /**
     * The size of the component.
     */
    @property({ reflect: true }) size: "s" | "m" | "l" = "m"
  }

  return SizeElement
}
