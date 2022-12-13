import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { SlotController } from "../common/controllers/SlotController.js"
import { DraftComponentMixin } from "../common/mixins/DraftComponentMixin.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./Drawer.scss"

/**
 * Drawer is used to display context-sensitive actions and  information.
 * Drawer doesn’t block users from completing their task, like a modal would.
 *
 * @status draft
 * @category structure
 * @slot header - Optional slot that holds a header for the drawer.
 * @slot - Default slot.
 * @slot footer - Optional slot that holds footer content for the drawer.
 *
 * @cssprop [--n-drawer-padding=var(--n-space-l)] - Controls the padding around the main area (the default slot), using our [spacing tokens](/tokens/#space).
 */
@customElement("nord-drawer")
export default class Drawer extends DraftComponentMixin(LitElement) {
  static styles = [componentStyle, style]

  private footerSlot = new SlotController(this, "footer")

  /**
   * Controls the padding of the drawer component.
   */
  @property({ reflect: true }) padding: "m" | "none" = "m"

  render() {
    return html`
      <div class="n-drawer">
        <slot name="header"></slot>

        <div class="n-drawer-main">
          <slot></slot>
        </div>

        <div class="n-drawer-footer" ?hidden=${this.footerSlot.isEmpty}>
          <slot name=${this.footerSlot.slotName}></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-drawer": Drawer
  }
}
