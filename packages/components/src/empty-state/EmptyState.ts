import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./EmptyState.scss"

/**
 * Empty state can be used when there is no data to display to
 * describe what the user can do next. Empty state provides
 * explanation and guidance to help user progress.
 *
 * @status ready
 * @category feedback
 * @slot - default slot
 */
@customElement("nord-empty-state")
export default class EmptyState extends LitElement {
  static styles = [componentStyle, style]

  render() {
    return html`<div class="n-empty-state">
      <slot></slot>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-empty-state": EmptyState
  }
}
