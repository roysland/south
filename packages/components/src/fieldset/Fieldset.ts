import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { SlotController } from "../common/controllers/SlotController.js"
import { cond } from "../common/directives/cond.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import style from "./Fieldset.scss"

/**
 * Fieldset is used for grouping sets of input components.
 * It is necessary to use a fieldset with radio and checkbox components.
 * It can also be useful for logically grouping other types of inputs.
 *
 * @status ready
 * @category form
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Optional slot that holds hint text for the fieldset.
 * @slot error - Optional slot that holds error text for the fieldset.
 */
@customElement("nord-fieldset")
export default class Fieldset extends LitElement {
  static styles = [componentStyle, formFieldStyle, style]

  private errorSlot = new SlotController(this, "error")
  private hintSlot = new SlotController(this, "hint")

  /**
   * Label for the fieldset.
   */
  @property() label: string = ""

  /**
   * Optional hint text to be displayed with the input. Alternatively use the hint slot.
   */
  @property() hint?: string

  /**
   * Optional error to be shown with the fieldset. Alternatively use the error slot.
   */
  @property() error?: string

  /**
   * Determines whether the fieldset is required or not.
   * A fieldset marked as required will be announced as such to users of assistive technology.
   * When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors.
   */
  @property({ type: Boolean }) required = false

  /**
   * Visually hide the required indicator, but still show
   * required attribute to assistive technologies like screen readers.
   */
  @property({ type: Boolean, attribute: "hide-required" }) hideRequired = false

  render() {
    const { hasError } = this

    return html`
      <fieldset
        aria-invalid=${cond(hasError, "true")}
        aria-describedby=${cond(hasError, "error")}
        ?aria-required=${this.required}
      >
        <legend class="n-label-container">
          <div class="n-label">
            <slot name="label">${this.label}</slot
            ><span aria-hidden="true" class="n-required" ?hidden=${!this.required || this.hideRequired}>*</span>
          </div>

          <div class="n-caption n-hint" ?hidden=${!this.hasHint}>
            <slot name="hint">${this.hint}</slot>
          </div>
        </legend>

        <slot></slot>

        <div class="n-caption n-error" id="error" role="alert" ?hidden=${!this.hasError}>
          <slot name="error">${this.error}</slot>
        </div>
      </fieldset>
    `
  }

  protected get hasHint() {
    return Boolean(this.hint) || this.hintSlot.hasContent
  }

  protected get hasError() {
    return Boolean(this.error) || this.errorSlot.hasContent
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-fieldset": Fieldset
  }
}
