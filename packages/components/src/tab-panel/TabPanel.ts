import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.css"
import style from "./TabPanel.css"

/**
 * The panel which contains content that can be revealed using a tab
 * in the tab group component.
 *
 * @status ready
 * @category navigation
 * @slot - The tab panel content.
 */
@customElement("nord-tab-panel")
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
    "nord-tab-panel": TabPanel
  }
}
