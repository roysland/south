import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { DraftComponentMixin } from "../common/mixins/DraftComponentMixin.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./ButtonGroup.scss"

/**
 * Button groups are designed to bring together button controls that are of a similar nature. For example text formatting controls.
 *
 * @status draft
 * @category structure
 * @slot - The button group content
 *
 * @cssprop [--n-button-group-border-radius=var(--n-border-radius-s)] - Controls the rounded corners of the button, using [border radius tokens](/tokens/#border-radius).
 * @cssprop [--n-button-group-box-shadow=var(--n-box-shadow)] - Controls the surrounding shadow, using [box shadow tokens](/tokens/#box-shadow).

 */
@customElement("kabal-button-group")
export default class ButtonGroup extends DraftComponentMixin(LitElement) {
  static styles = [componentStyle, style]

  /**
   * The direction of the button group.
   */
  @property({ reflect: true }) direction: "vertical" | "horizontal" = "horizontal"

  /**
   * The appropriate role for the containing element.
   */
  @property({ reflect: true }) role: string = "group"

  render() {
    return html`
      <div class="n-button-group">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-button-group": ButtonGroup
  }
}
