import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"
import { SlotController } from "../common/controllers/SlotController.js"
import componentStyle from "../common/styles/Component.css"
import style from "./Header.css"

/**
 * The header is a block of designated space for labelling the currently
 * viewed context as well as providing primary actions.
 *
 * @status ready
 * @category structure
 * @slot - The header content.
 * @slot end - Optional slot for buttons, toggles, etc.
 */
@customElement("nord-header")
export default class Header extends LitElement {
  static styles = [componentStyle, style]

  private endSlot = new SlotController(this, "end")

  render() {
    return html`
      <header class="n-header">
        <slot></slot>
        <div class="n-header-end" ?hidden=${this.endSlot.isEmpty}>
          <slot name="end"></slot>
        </div>
      </header>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-header": Header
  }
}
