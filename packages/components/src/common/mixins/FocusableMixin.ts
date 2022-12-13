/* eslint-disable max-classes-per-file */

import { LitElement } from "lit"
import { createRef, Ref } from "lit/directives/ref.js"

type Constructable<T = Record<string, unknown>> = new (...args: any[]) => T

export declare class FocusableMixinInterface {
  protected focusableRef: Ref<HTMLElement>
  focus(options?: FocusOptions): void
  blur(): void
  click(): void
}

export function FocusableMixin<T extends Constructable<LitElement>>(superClass: T) {
  class FocusableElement extends superClass {
    protected focusableRef = createRef<HTMLElement>()

    /**
     * Programmatically move focus to the component.
     * @param {FocusOptions} options An object which controls aspects of the focusing process.
     */
    focus(options?: FocusOptions) {
      this.focusableRef.value?.focus(options)
    }

    /**
     * Programmatically remove focus from the component.
     */
    blur() {
      this.focusableRef.value?.blur()
    }

    /**
     * Programmatically simulates a click on the component.
     */
    click() {
      this.focusableRef.value?.click()
    }
  }

  return FocusableElement as unknown as Constructable<FocusableMixinInterface> & T
}
