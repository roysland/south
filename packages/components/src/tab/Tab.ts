import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { observe } from "../common/decorators/observe.js"
import { SlotController } from "../common/controllers/SlotController.js"

import componentStyle from "../common/styles/Component.css"
import style from "./Tab.css"

/**
 * The interactive tab button for use within the tab group component.
 *
 * @status ready
 * @category navigation
 * @slot - The tab button content.
 *
 * @cssprop [--n-tab-color=var(--n-color-text-weak)] - Controls the text color of the tab, using our [color tokens](/tokens/#color).
 * @cssprop [--n-tab-font-weight=var(--n-font-weight)] - Controls the font weight of the tab, using our [font tokens](/tokens/#font).
 */
@customElement("nord-tab")
export default class Tab extends LitElement {
  static styles = [componentStyle, style]

  private defaultSlot = new SlotController(this)

  /**
   * Whether the tab item is selected
   */
  @property({ reflect: true, type: Boolean }) selected: boolean = false

  render() {
    return html`<div class="n-tab" data-text="${this.defaultSlot.isEmpty ? this.textContent : ""}">
      <slot></slot>
    </div>`
  }

  /**
   * Apply accessible attributes and values to the tab button.
   * Observe the selected property if it changes
   */
  @observe("selected")
  protected handleSelectionChange() {
    this.setAttribute("aria-selected", `${this.selected}`)
    this.setAttribute("tabindex", this.selected ? "0" : "-1")
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("role", "tab")
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-tab": Tab
  }
}
