import { LitElement, html } from "lit"
import { ref } from "lit/directives/ref.js"
import { classMap } from "lit/directives/class-map.js"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { NordEvent } from "../common/events.js"

import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"
import { ReadonlyMixin } from "../common/mixins/ReadonlyMixin.js"
import { AutocompleteMixin } from "../common/mixins/AutocompleteMixin.js"
import { DirectionController } from "../common/controllers/DirectionController.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import textFieldStyle from "../common/styles/TextField.scss"
import style from "./Range.scss"

/**
 * Range input lets user specify a numeric value using a slider which
 * must be no less than a given value, and no more than another given value.
 *
 * @status new
 * @category form
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Optional slot that holds hint text for the input.
 * @slot error - Optional slot that holds error text for the input.
 *
 * @cssprop [--n-range-thumb-size=20px] - Controls the size of the thumb.
 * @cssprop [--n-range-track-color-active=var(--n-color-accent)] - Controls the color of the portion of the track that represents the current value.
 * @cssprop [--n-range-track-color-inactive=var(--n-color-border-strong)] - Controls the color of the portion of the track that represents the remaining value.
 * @cssprop [--n-range-track-size=3px] - Controls the height of the track.
 */
@customElement("nord-range")
export default class Range extends FormAssociatedMixin(
  AutocompleteMixin(ReadonlyMixin(InputMixin(FocusableMixin(LitElement))))
) {
  static styles = [componentStyle, formFieldStyle, textFieldStyle, style]

  private direction = new DirectionController(this)

  /**
   * Minimum value for the range slider.
   */
  @property() min: number = 0

  /**
   * Maximum value for the range slider.
   */
  @property() max: number = 10

  /**
   * Step amount for the range slider.
   */
  @property() step: number = 1

  /**
   * Controls whether the input expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  render() {
    const value = Number(this.value) || 0
    const percent = Math.max(0, (value - this.min) / (this.max - this.min))

    return html`
      <div class="n-input-container">
        ${this.renderLabel(html`<span class="n-range-output" aria-hidden="true">${value}</span>`)}

        <input
          ${ref(this.focusableRef)}
          id=${this.inputId}
          type="range"
          class=${classMap({
            "n-range": true,
            "is-rtl": this.direction.isRTL,
          })}
          name=${ifDefined(this.name)}
          min=${this.min}
          step=${this.step}
          max=${this.max}
          style=${`--_n-range-progress: ${percent * 100}%`}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          .value=${this.value ? this.value : "0"}
          @input=${this.handleInput}
          @change=${this.handleChange}
          aria-describedby=${ifDefined(this.getDescribedBy())}
          aria-invalid=${ifDefined(this.getInvalid())}
        />
      </div>

      ${this.renderError()}
    `
  }

  protected handleInput(e: Event) {
    e.stopPropagation()
    const target = e.target as HTMLInputElement

    if (this.readonly) {
      e.preventDefault()
      target.value = this.value
      return
    }

    this.value = target.value

    /**
     * Fired as the user types into the input.
     */
    this.dispatchEvent(new NordEvent("input"))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-range": Range
  }
}
