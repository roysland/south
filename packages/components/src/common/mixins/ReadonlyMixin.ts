/* eslint-disable max-classes-per-file */
import { LitElement } from "lit"
import { property } from "lit/decorators.js"

type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T

export declare class ReadonlyMixinInterface {
  readonly: boolean
}

export function ReadonlyMixin<T extends Constructor<LitElement>>(
  superClass: T
): Constructor<ReadonlyMixinInterface> & T {
  class ReadonlyElement extends superClass {
    /**
     * Makes the component readonly, so that it is not editable.
     * Readonly differs from disabled in that readonly fields are still focusable and will be submitted with a form.
     */
    @property({ type: Boolean, reflect: true }) readonly = false
  }

  return ReadonlyElement
}
