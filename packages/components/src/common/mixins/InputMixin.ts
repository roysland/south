/* eslint-disable max-classes-per-file */
import { LitElement } from "lit"
import { property } from "lit/decorators.js"

type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T

export declare class InputMixinInterface {
  name?: string
  value: string
  disabled: boolean
  get form(): HTMLFormElement | null
}

export function InputMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<InputMixinInterface> & T {
  class InputElement extends superClass {
    /**
     * Makes the component disabled. This prevents users from
     * being able to interact with the component, and conveys
     * its inactive state to assistive technologies.
     */
    @property({ type: Boolean, reflect: true }) disabled = false

    /**
     * The name of the form component.
     */
    @property() name?: string

    /**
     * The value of the form component.
     */
    @property() value: string = ""

    /**
     * Gets the form, if any, associated with the form element.
     */
    get form() {
      if (this.hasAttribute("form")) {
        const root = this.getRootNode() as ShadowRoot | Document
        return root.querySelector<HTMLFormElement>(`form#${this.getAttribute("form")}`)
      }

      return this.closest("form")
    }
  }

  return InputElement
}
