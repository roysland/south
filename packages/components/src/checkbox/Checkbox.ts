import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { ref } from "lit/directives/ref.js"
import * as checkedIcon from "@nordhealth/icons/lib/assets/interface-checked-small.js"
import * as indeterminateIcon from "@nordhealth/icons/lib/assets/interface-remove-small.js"

import Icon from "../icon/Icon.js"
import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"
import { SizeMixin } from "../common/mixins/SizeMixin.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import style from "./Checkbox.scss"

Icon.registerIcon(checkedIcon)
Icon.registerIcon(indeterminateIcon)

/**
 * Checkboxes allow user to choose one or more options from a limited set of options.
 * If you have more than 10 options, please use Select component instead.
 *
 * @status ready
 * @category form
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Optional slot that holds hint text for the input.
 * @slot error - Optional slot that holds error text for the input.
 */
@customElement("kabal-checkbox")
export default class Checkbox extends SizeMixin(FormAssociatedMixin(InputMixin(FocusableMixin(LitElement)))) {
  static styles = [componentStyle, formFieldStyle, style]

  protected override get formValue() {
    return this.checked ? this.value || "on" : undefined
  }

  /**
   * Controls whether the checkbox is in an indeterminate state.
   */
  @property({ type: Boolean }) indeterminate = false

  /**
   * Controls whether the checkbox is checked or not.
   */
  @property({ type: Boolean }) checked: boolean = false

  render() {
    return html`
      <div class="n-flex">
        <div class="n-input-container">
          <input
            ${ref(this.focusableRef)}
            class="n-input"
            id=${this.inputId}
            type="checkbox"
            name=${ifDefined(this.name)}
            .value=${this.value}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-describedby=${ifDefined(this.getDescribedBy())}
            aria-invalid=${ifDefined(this.getInvalid())}
            @change=${this.handleChange}
          />
          <kabal-icon class="icon-checked" name="interface-checked-small"></kabal-icon>
          <kabal-icon class="icon-indeterminate" name="interface-remove-small"></kabal-icon>
        </div>
        <div class="n-expand">${this.renderLabel()} ${this.renderError()}</div>
      </div>
    `
  }

  protected handleChange(e: Event): void {
    const target = e.target as HTMLInputElement
    this.checked = target.checked
    super.handleChange(e)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-checkbox": Checkbox
  }
}
