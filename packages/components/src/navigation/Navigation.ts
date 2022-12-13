import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"

import style from "./Navigation.scss"

/**
 * Navigation is used to display the primary navigation in the sidebar
 * of an application. Navigation includes a list of links that users
 * use to move between sections of the application.
 *
 * @status ready
 * @category navigation
 * @slot - The main section of the sidebar, for holding nav components.
 * @slot header - The top section of the sidebar.
 * @slot footer - The bottom section of the sidebar.
 */
@customElement("nord-navigation")
export default class Navigation extends LitElement {
  static styles = style

  render() {
    return html`
      <slot name="header"></slot>
      <nav>
        <slot></slot>
      </nav>
      <slot name="footer"></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-navigation": Navigation
  }
}
