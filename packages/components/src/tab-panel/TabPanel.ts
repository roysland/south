import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./TabPanel.scss"

/**
 * The panel which contains content that can be revealed using a tab
 * in the tab group component.
 *
 * @status ready
 * @category navigation
 * @slot - The tab panel content.
 */
@customElement("kabal-tab-panel")
export default class TabPanel extends LitElement {
  static styles = [componentStyle, style]

  render() {
    return html`<div class="n-tab-panel"><slot></slot></div>`
  }

  connectedCallback() {
    super.connectedCallback()

    /**
     * Apply accessible attributes and values to the tab panel.
     */
    this.setAttribute("role", "tabpanel")
    this.setAttribute("tabindex", "0")
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-tab-panel": TabPanel
  }
}
