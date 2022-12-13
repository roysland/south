import { LitElement, html, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { classMap } from "lit/directives/class-map.js"
import { ref } from "lit/directives/ref.js"

import * as searchIcon from "@nordhealth/icons/lib/assets/navigation-search.js"
import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"
import { ReadonlyMixin } from "../common/mixins/ReadonlyMixin.js"
import { AutocompleteMixin } from "../common/mixins/AutocompleteMixin.js"
import { SizeMixin } from "../common/mixins/SizeMixin.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import textFieldStyle from "../common/styles/TextField.scss"
import style from "./Input.scss"
import { SlotController } from "../common/controllers/SlotController.js"
import { DirectionController } from "../common/controllers/DirectionController.js"
import { cond } from "../common/directives/cond.js"
import { getSubmitButton } from "../common/form.js"
import { cleanValue } from "../common/input.js"
import Icon from "../icon/Icon.js"

import type Dropdown from "../dropdown/Dropdown.js"
import type Button from "../button/Button.js"

Icon.registerIcon(searchIcon)

const isButtonOrDropdown = (el: Element | null): el is Button | Dropdown => {
  if (el === null) return false
  return el.localName === "nord-button" || el.localName === "nord-dropdown"
}

/**
 * Inputs are used to allow users to provide text input when the expected input is short.
 * As well as plain text, Input supports various types of text, including passwords and numbers.
 *
 * @status ready
 * @category form
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Optional slot that holds hint text for the input.
 * @slot error - Optional slot that holds error text for the input.
 * @slot start - Optional slot used to place an icon or prefix at the start of the input.
 * @slot end - Optional slot used to place an icon or suffix at the end of the input.
 *
 * @cssprop [--n-input-inline-size=240px] - Controls the inline size, or width, of the input.
 * @cssprop [--n-input-background=var(--n-color-active)] - Controls the background of the input, using our [color tokens](/tokens/#color).
 * @cssprop [--n-input-color=var(--n-color-text)] - Controls the text color of the input, using our [color tokens](/tokens/#color).
 * @cssprop [--n-input-border-color=var(--n-color-border-strong)] - Controls the border color of the input, using our [color tokens](/tokens/#color).
 * @cssprop [--n-input-border-radius=var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 */
@customElement("nord-input")
export default class Input extends SizeMixin(
  FormAssociatedMixin(AutocompleteMixin(ReadonlyMixin(InputMixin(FocusableMixin(LitElement)))))
) {
  static styles = [componentStyle, formFieldStyle, textFieldStyle, style]

  private startSlot = new SlotController(this, "start")
  private endSlot = new SlotController(this, "end")
  private direction = new DirectionController(this)

  /**
   * The type of the input.
   */
  @property({ reflect: true }) type: "text" | "email" | "password" | "tel" | "url" | "search" | "number" = "text"

  /**
   * Controls whether the input expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  /**
   * Optionally disallow certain characters from being used inside the input, using a regex pattern.
   */
  @property({ reflect: true, attribute: "disallow-pattern" }) disallowPattern?: string = undefined

  render() {
    const startSlotHasContent = this.type === "search" || this.startSlot.hasContent
    const isNumber = this.type === "number"

    return html`
      ${this.renderLabel()}

      <div
        class=${classMap({
          "n-input-container": true,
          "has-start": startSlotHasContent,
          "has-end": this.endSlot.hasContent,
          "has-start-button": isButtonOrDropdown(this.startSlot.content),
          "has-end-button": isButtonOrDropdown(this.endSlot.content),
          "is-rtl": this.direction.dir === "rtl",
        })}
      >
        <slot name=${this.startSlot.slotName} ?hidden=${!startSlotHasContent}>
          ${this.type === "search" ? html`<nord-icon name="navigation-search"></nord-icon>` : nothing}
        </slot>
        <input
          ${ref(this.focusableRef)}
          id=${this.inputId}
          class="n-input"
          type=${isNumber ? "text" : this.type}
          inputmode=${cond(isNumber, "numeric")}
          pattern=${cond(isNumber, "[0-9]*")}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          name=${ifDefined(this.name)}
          .value=${this.value ?? ""}
          placeholder=${ifDefined(this.placeholder)}
          @input=${this.handleInputChange}
          @change=${this.handleChange}
          @keydown=${this.handleKeydown}
          aria-describedby=${ifDefined(this.getDescribedBy())}
          aria-invalid=${ifDefined(this.getInvalid())}
          spellcheck="false"
          autocomplete=${this.autocomplete as any}
        />
        <slot name=${this.endSlot.slotName} ?hidden=${this.endSlot.isEmpty}></slot>
      </div>

      ${this.renderError()}
    `
  }

  private handleKeydown(e: KeyboardEvent) {
    const { form } = this

    if (e.key === "Enter" && form) {
      const button = getSubmitButton(form)
      setTimeout(() => button?.click(), 0)
    }
  }

  private handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement

    // clean up any invalid characters
    if (this.disallowPattern) {
      cleanValue(target, new RegExp(this.disallowPattern, "g"))
    }
    this.handleInput(e)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-input": Input
  }
}
