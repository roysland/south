import { LitElement, html, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import "../icon/Icon.js"

import style from "./NavGroup.scss"

/**
 * Navigation group includes all the actions or items in a single
 * group and is used for grouping items into related categories.
 *
 * @category navigation
 * @status ready
 * @slot - The default slot used for the nav items.
 */
@customElement("kabal-nav-group")
export default class NavGroup extends LitElement {
  static styles = style

  /**
   * Heading and accessible label for the nav group
   */
  @property() heading?: string

  render() {
    return html`
      ${this.heading ? html`<p id="heading" aria-hidden="true" class="n-heading">${this.heading}</p>` : nothing}
      <div role="list" aria-labelledby=${this.heading ? "heading" : nothing}>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-nav-group": NavGroup
  }
}
