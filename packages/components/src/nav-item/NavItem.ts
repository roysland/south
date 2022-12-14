import { LitElement, html, nothing, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { ref } from "lit/directives/ref.js"
import { DirectionController } from "../common/controllers/DirectionController.js"
import { SlotController } from "../common/controllers/SlotController.js"
import { cond } from "../common/directives/cond.js"
import { NordEvent } from "../common/events.js"
import { FocusableMixin } from "../common/mixins/FocusableMixin.js"

import style from "./NavItem.scss"

/**
 * Navigation item populates sidebar navigation with links.
 * Every item should be placed inside a navigation group.
 *
 * @status ready
 * @category navigation
 * @slot - The default slot used for the nav item's text.
 * @slot subnav - Used for nesting navigation. When used the nav-item becomes a button to collapse the subnav, rather than a link.
 * @fires toggle - Dispatched whenever a nav item's state changes between open and closed.
 */
@customElement("kabal-nav-item")
export default class NavItem extends FocusableMixin(LitElement) {
  static styles = style

  private subnavSlot = new SlotController(this, "subnav")
  private direction = new DirectionController(this)

  /**
   * Used for indicating the current page. This gives a prominent background to the nav item,
   * and marks the item as the current page for assistive technology.
   */
  @property({ type: Boolean, reflect: true }) active = false

  /**
   * The name of an icon from Nordicons to display for the nav item.
   */
  @property() icon?: string

  /**
   * The url the nav item should link to.
   * Note: this is not used if you have nested navigation using the "subnav" slot.
   */
  @property() href?: string

  /**
   * Allows you to add a notification badge with a number next to the nav item.
   */
  @property() badge?: string

  /**
   * When the nav items contains a subnav, controls whether the section is expanded or not.
   * Note: this is only used if you have nested navigation using the "subnav" slot.
   */
  @property({ type: Boolean }) open = false

  connectedCallback() {
    super.connectedCallback()

    // in cases where there is nested nav, and one of the items is active
    // we should auto-open the nav item for developer convenience
    if (this.querySelector(`kabal-nav-item[active]`)) {
      this.open = true
    }
  }

  render() {
    const innards = html`
      ${this.icon ? html`<kabal-icon class="n-nav-icon" name=${this.icon} size="m"></kabal-icon>` : nothing}
      <div class="n-nav-content">
        <span class="n-nav-label"><slot></slot></span>
        ${this.badge ? html`<span class="n-nav-badge">${this.badge}</span>` : nothing}
      </div>
    `
    let element: TemplateResult

    if (this.subnavSlot.hasContent) {
      element = this.renderToggle(innards)
    } else if (this.href) {
      element = this.renderLink(innards)
    } else {
      element = this.renderButton(innards)
    }

    return html`
      <div role="listitem">
        ${element}
        <slot name=${this.subnavSlot.slotName} ?hidden=${!this.open}></slot>
      </div>
    `
  }

  private renderLink(innards: TemplateResult) {
    return html`
      <a class="n-nav-item" ${ref(this.focusableRef)} aria-current=${cond(this.active, "page")} href=${this.href || ""}>
        ${innards}
      </a>
    `
  }

  private renderToggle(innards: TemplateResult) {
    return html`
      <button
        class="n-nav-item"
        @click=${this.toggleOpen}
        aria-expanded=${this.open ? "true" : "false"}
        ${ref(this.focusableRef)}
      >
        ${innards}

        <kabal-icon
          size="xxs"
          class=${classMap({ "n-toggle-icon": true, "n-rtl": this.direction.isRTL })}
          name="arrow-expand-right-small"
        ></kabal-icon>
      </button>
    `
  }

  private renderButton(innards: TemplateResult) {
    return html`<button class="n-nav-item" ${ref(this.focusableRef)}>${innards}</button>`
  }

  private toggleOpen() {
    this.open = !this.open
    this.dispatchEvent(new NordEvent("toggle"))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-nav-item": NavItem
  }
}
