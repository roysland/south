import { LitElement, html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { customElement, property } from "lit/decorators.js"
import { ref } from "lit/directives/ref.js"
import { FocusableMixin } from "../common/mixins/FocusableMixin.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./ProgressBar.scss"

/**
 * Progress Bar is used to visually represent the completion
 * of a task or process. It shows how much of the task has
 * been completed and how much is still left.
 *
 * @status ready
 * @category feedback
 *
 * @cssprop [--n-progress-size=var(--n-space-s)] - Controls the thickness of the progress bar, using our [spacing tokens](/tokens/#space).
 * @cssprop [--n-progress-border-radius=var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 * @cssprop [--n-progress-color=var(--n-color-accent)] - Controls the color of the progress bar, using [color tokens](/tokens/#color).
 */
@customElement("kabal-progress-bar")
export default class ProgressBar extends FocusableMixin(LitElement) {
  static styles = [componentStyle, style]

  /**
   * Specifies how much of the task has been completed. Must be a valid floating
   * point number between 0 and max, or between 0 and 100 if max is omitted. If
   * there is no value, the progress bar is indeterminate; this indicates that
   * an activity is ongoing with no indication of how long it’s expected to take.
   */
  @property({ reflect: true, type: Number }) value?: number

  /**
   * Describes how much work the task indicated by the progress element requires.
   * The max attribute, if present, must have a value greater than 0 and be a
   * valid floating point number.
   */
  @property({ reflect: true, type: Number }) max: number = 100

  /**
   * Accessible label for the progress indicator. Visually hidden, but shown
   * for assistive technology.
   */
  @property({ reflect: true }) label: string = "Current progress"

  render() {
    /**
     * The Aria properties are required for now due to a Chrome bug.
     * In the future we can probably get rid of them. For context:
     * https://bugs.chromium.org/p/chromium/issues/detail?id=1310779
     */
    return html`<label>
      <kabal-visually-hidden>${this.label}</kabal-visually-hidden>
      <progress
        ${ref(this.focusableRef)}
        aria-valuenow=${ifDefined(this.value)}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        tabindex="-1"
        max=${this.max}
        value=${ifDefined(this.value)}
      ></progress>
    </label>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-progress-bar": ProgressBar
  }
}
