/* eslint-disable lit-a11y/role-has-required-aria-attrs */
import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { ref } from "lit/directives/ref.js"

import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import style from "./Toggle.scss"

/**
 * Toggle switch gives control over a feature or option that can be
 * turned on or off. If a physical switch would work for the action, a
 * toggle is probably the best component to use.
 *
 * @status ready
 * @category form
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Optional slot that holds hint text for the input.
 * @slot error - Optional slot that holds error text for the input.
 */
@customElement("nord-toggle")
export default class Toggle extends FormAssociatedMixin(InputMixin(FocusableMixin(LitElement))) {
  static styles = [componentStyle, formFieldStyle, style]

  protected override get formValue() {
    return this.checked ? this.value || "on" : undefined
  }

  /**
   * Controls whether the toggle is checked or not.
   */
  @property({ type: Boolean }) checked: boolean = false

  /**
   * Controls whether the contents are displayed in reverse order,
   * putting the label before the toggle.
   */
  @property({ type: Boolean }) reverse: boolean = false

  /**
   * The size of the toggle switch.
   */
  @property({ reflect: true }) size: "s" | "m" | "l" = "m"

  render() {
    const label = html`<div class="n-expand">${this.renderLabel()} ${this.renderError()}</div>`
    const input = html`<div class="n-input-container">
      <input
        ${ref(this.focusableRef)}
        class="n-toggle"
        id=${this.inputId}
        type="checkbox"
        role="switch"
        name=${ifDefined(this.name)}
        .value=${this.value}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        ?required=${this.required}
        aria-describedby=${ifDefined(this.getDescribedBy())}
        aria-invalid=${ifDefined(this.getInvalid())}
        @change=${this.handleChange}
      />
    </div>`

    return html`<div class="n-flex">${this.reverse ? [label, input] : [input, label]}</div>`
  }

  protected handleChange(e: Event): void {
    const target = e.target as HTMLInputElement
    this.checked = target.checked
    super.handleChange(e)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-toggle": Toggle
  }
}
