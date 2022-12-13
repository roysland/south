import { LitElement, html, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { ref } from "lit/directives/ref.js"
import { observe } from "../common/decorators/observe.js"

import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"
import { ReadonlyMixin } from "../common/mixins/ReadonlyMixin.js"
import { AutocompleteMixin } from "../common/mixins/AutocompleteMixin.js"
import { SizeMixin } from "../common/mixins/SizeMixin.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import textFieldStyle from "../common/styles/TextField.scss"
import style from "./Textarea.scss"
import { LocalizeController } from "../localization/LocalizeController.js"

function createLengthMeasurer(locale: string) {
  if (Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(locale)
    return (value: string) => [...segmenter.segment(value)].length
  }

  return (value: string) => value.length
}

/**
 * Textarea is a component that allows user to write text over
 * multiple rows. Used when the expected user input is long.
 * For shorter input, use the Input component.
 *
 * @status ready
 * @category form
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Optional slot that holds hint text for the textarea.
 * @slot error - Optional slot that holds error text for the textarea.
 *
 * @cssprop [--n-textarea-inline-size=240px] - Controls the inline size, or width, of the textarea.
 * @cssprop [--n-textarea-block-size=76px] - Controls the block size, or height, or the textarea.
 * @cssprop [--n-textarea-background=var(--n-color-active)] - Controls the background of the textarea, using our [color tokens](/tokens/#color).
 * @cssprop [--n-textarea-color=var(--n-color-text)] - Controls the text color of the textarea, using our [color tokens](/tokens/#color).
 * @cssprop [--n-textarea-border-color=var(--n-color-border-strong)] - Controls the border color of the textarea, using our [color tokens](/tokens/#color).
 * @cssprop [--n-textarea-border-radius=var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 */
@customElement("nord-textarea")
export default class Textarea extends SizeMixin(
  FormAssociatedMixin(AutocompleteMixin(ReadonlyMixin(InputMixin(FocusableMixin(LitElement)))))
) {
  static styles = [componentStyle, formFieldStyle, textFieldStyle, style]

  protected inputId = "textarea"

  private lengthMeasurer!: (value: string) => number
  private localize = new LocalizeController<"nord-textarea">(this, {
    onLangChange: () => this.handleLangChange(),
  })

  /**
   * Controls whether the textarea is resizable.
   * By default is manually resizable vertically.
   * Set to "auto" to enable auto-resizing as content grows.
   */
  @property({ reflect: true }) resize: "vertical" | "auto" = "vertical"

  /**
   * Controls whether the textarea expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  /**
   * Controls the max allowed length for the textarea.
   */
  @property({ attribute: "maxlength", type: Number }) maxLength?: number

  /**
   * Controls whether to show a count of the number of characters in the textarea.
   * When combined with `maxlength`, both the count and the max length are shown.
   */
  @property({ type: Boolean, attribute: "character-counter" }) characterCounter = false

  render() {
    return html`
      ${this.renderLabel()}

      <div class="n-input-container">
        <textarea
          ${ref(this.focusableRef)}
          id=${this.inputId}
          class="n-input"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          name=${ifDefined(this.name)}
          maxlength=${ifDefined(this.maxLength)}
          .value=${this.value ?? ""}
          placeholder=${ifDefined(this.placeholder)}
          @change=${this.handleChange}
          @input=${this.handleInput}
          aria-describedby=${ifDefined(this.getDescribedBy())}
          aria-invalid=${ifDefined(this.getInvalid())}
          autocomplete=${this.autocomplete as any}
        ></textarea>

        ${this.characterCounter ? this.renderCharacterCounter() : nothing}
      </div>

      ${this.renderError()}
    `
  }

  private renderCharacterCounter() {
    const { value, maxLength } = this
    const length = typeof value === "string" ? this.lengthMeasurer(value) : 0
    const remainder = maxLength ? maxLength - length : undefined
    const counter = maxLength ? `${length}/${maxLength}` : length

    return html`
      <nord-visually-hidden aria-live="polite" aria-atomic="true">
        ${remainder != null && remainder <= 10 ? this.localize.term("remainingCharacters", remainder) : ""}
      </nord-visually-hidden>
      <div class="n-character-counter">${counter}</div>
    `
  }

  private handleLangChange() {
    const lang = this.localize.resolvedLang
    this.lengthMeasurer = createLengthMeasurer(lang)
  }

  @observe("resize", "updated")
  @observe("value", "updated")
  protected resizeToFitContent() {
    const textarea = this.focusableRef.value

    if (!textarea) {
      return
    }

    if (this.resize === "auto") {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    } else {
      textarea.style.height = ""
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-textarea": Textarea
  }
}
