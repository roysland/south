/* eslint-disable lit-a11y/no-invalid-change-handler */
import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { ref } from "lit/directives/ref.js"
import * as dropdownIcon from "@nordhealth/icons/lib/assets/interface-dropdown-small.js"

import "../button/Button.js"
import Icon from "../icon/Icon.js"

import { InputMixin } from "../common/mixins/InputMixin.js"
import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { AutocompleteMixin } from "../common/mixins/AutocompleteMixin.js"
import { SizeMixin } from "../common/mixins/SizeMixin.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import style from "./Select.scss"
import { SlotController } from "../common/controllers/SlotController.js"

Icon.registerIcon(dropdownIcon)

/**
 * Select lets users choose one option from an options menu.
 * Consider using select when you have 5 or more options to choose from.
 *
 * @status ready
 * @category form
 * @slot - Default slot for holding <option> elements.
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Use when a hint requires more than plain text.
 * @slot error - Optional slot that holds error text for the input.
 */
@customElement("nord-select")
export default class Select extends SizeMixin(
  FormAssociatedMixin(AutocompleteMixin(InputMixin(FocusableMixin(LitElement))))
) {
  static styles = [componentStyle, formFieldStyle, style]

  protected override get formValue() {
    return this.value || undefined
  }

  private defaultSlot = new SlotController(this)

  protected inputId = "select"

  /**
   * Controls whether the select expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  render() {
    const slottedOptions = this.options
    const buttonText = this.getButtonText(slottedOptions)

    return html`
      <slot></slot>
      ${this.renderLabel()}

      <div class="n-select-container">
        <select
          ${ref(this.focusableRef)}
          id=${this.inputId}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${ifDefined(this.name)}
          @change=${this.handleChange}
          @input=${this.handleInput}
          aria-describedby=${ifDefined(this.getDescribedBy())}
          aria-invalid=${ifDefined(this.getInvalid())}
          autocomplete=${this.autocomplete as any}
        >
          ${this.placeholder && html`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>`}
          ${slottedOptions.map(option => this.renderOption(option))}
        </select>

        <nord-button
          size=${this.size}
          tabindex="-1"
          ?disabled=${this.disabled}
          ?expand=${this.expand}
          aria-hidden="true"
          type="button"
        >
          <slot slot="start" name="icon"></slot>
          ${buttonText}
          <nord-icon slot="end" name="interface-dropdown-small"></nord-icon>
        </nord-button>
      </div>

      ${this.renderError()}
    `
  }

  private get options() {
    return Array.from(this.querySelectorAll("option"))
  }

  private getButtonText(options: HTMLOptionElement[]): string {
    const selected = options.find(option => option.value === this.value.toString())

    if (selected) {
      return selected.text
    }

    if (this.placeholder) {
      return this.placeholder
    }

    if (options[0]) {
      return options[0].text
    }

    return ""
  }

  private renderOption(option: HTMLOptionElement) {
    return html`
      <option
        value=${ifDefined(option.value)}
        ?disabled=${option.disabled}
        .selected=${option.value === this.value.toString()}
      >
        ${option.text}
      </option>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-select": Select
  }
}
