import { LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { observe } from "../common/decorators/observe.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./Divider.scss"

/**
 * Divider components are used to separate and distinguish sections of
 * content or groups of menu items. Visually, they look like
 * horizontal or vertical lines.
 *
 * @status new
 * @category structure
 *
 * @cssprop [--n-divider-color=var(--n-color-border)] - Controls the color of the divider, using our [color tokens](/tokens/#color).
 * @cssprop [--n-divider-size=1px] - Controls the size, or thickness, of the divider.
 */
@customElement("nord-divider")
export default class Divider extends LitElement {
  static styles = [componentStyle, style]

  /**
   * The direction of the divider.
   */
  @property({ reflect: true }) direction: "vertical" | "horizontal" = "horizontal"

  firstUpdated() {
    this.setAttribute("role", "separator")
  }

  @observe("direction")
  private handleDirectionChange() {
    this.setAttribute("aria-orientation", this.direction === "vertical" ? "vertical" : "horizontal")
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-divider": Divider
  }
}
