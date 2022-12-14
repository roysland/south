import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { cond } from "../common/directives/cond.js"
import componentStyle from "../common/styles/Component.scss"
import style from "./Spinner.scss"

/**
 * Spinner component is used to indicate users that their action is being
 * processed. You can customize the size and color of the spinner with the
 * provided properties.
 *
 * @status ready
 * @category feedback
 */
@customElement("kabal-spinner")
export default class Spinner extends LitElement {
  static styles = [componentStyle, style]

  /**
   * The size of the spinner.
   */
  @property({ reflect: true }) size: "xs" | "s" | "m" | "l" | "xl" | "xxl" = "m"

  /**
   * The color of the spinner.
   * Can accept any valid CSS color value, including custom properties.
   */
  @property({ reflect: true }) color?: string

  /**
   * An accessible label for the spinner.
   * If no label is supplied, the spinner is hidden from assistive technology.
   */
  @property({ reflect: true }) label?: string

  render() {
    // if a label is supplied, we give the div a role of img.
    // without this we could not use aria-label, since it is only valid on elements of certain roles.
    return html`
      <div
        class="n-spinner"
        role=${cond(this.label, "img")}
        aria-label=${ifDefined(this.label)}
        style=${cond(this.color, `color:${this.color}`)}
      ></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-spinner": Spinner
  }
}
