import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { SlotController } from "../common/controllers/SlotController.js"
import componentStyle from "../common/styles/Component.scss"
import style from "./Card.scss"

/**
 * Cards are shadowed surfaces that display content and actions on a
 * single topic. They should be easy to scan for relevant and
 * actionable information.
 *
 * @status ready
 * @category structure
 * @slot - The card content.
 * @slot header - Optional slot that holds a header for the card.
 * @slot header-end - Optional slot that positions content at the end of the header. Useful for actions or additional info.
 * @slot footer - Optional slot that holds footer content for the card.
 *
 * @cssprop [--n-card-border-radius=var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 * @cssprop [--n-card-box-shadow=var(--n-box-shadow-popout)] - Controls the surrounding shadow, using [box shadow tokens](/tokens/#box-shadow).
 * @cssprop [--n-card-padding=var(--n-space-m)] - Controls the padding on all sides of the card.
 * @cssprop [--n-card-slot-padding=var(--n-space-m)] - Controls the padding of items slotted within the card. This does not affect the block padding of items slotted into the header.
 */
@customElement("nord-card")
export default class Card extends LitElement {
  static styles = [componentStyle, style]

  private headerSlot = new SlotController(this, "header")
  private headerEndSlot = new SlotController(this, "header-end")
  private footerSlot = new SlotController(this, "footer")

  /**
   * Controls the padding of the card component. When set to “none”,
   * the header and footer slots will still have padding.
   */
  @property({ reflect: true }) padding: "m" | "l" | "none" = "m"

  render() {
    return html`
      <div class="n-card">
        <div class="header" ?hidden=${this.headerSlot.isEmpty && this.headerEndSlot.isEmpty}>
          <slot name=${this.headerSlot.slotName}></slot>
          <slot name=${this.headerEndSlot.slotName}></slot>
        </div>
        <slot></slot>
        <slot name=${this.footerSlot.slotName} ?hidden=${this.footerSlot.isEmpty}></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-card": Card
  }
}
