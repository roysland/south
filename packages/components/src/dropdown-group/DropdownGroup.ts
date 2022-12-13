import { LitElement, html, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./DropdownGroup.scss"

/**
 * Dropdown group includes all the actions or items in a single dropdown
 * group and is used for grouping items into related categories.
 *
 * @status ready
 * @category action
 * @slot - The dropdown group content.
 */
@customElement("nord-dropdown-group")
export default class DropdownGroup extends LitElement {
  static styles = [componentStyle, style]

  /**
   * Heading and accessible label for the dropdown group.
   */
  @property() heading?: string

  render() {
    return html`
      <div class="n-dropdown-group">
        ${this.heading
          ? html`<p id="heading" aria-hidden="true" class="n-dropdown-group-heading">${this.heading}</p>`
          : nothing}
        <div class="n-dropdown-group-content" role="group" aria-labelledby=${this.heading ? "heading" : nothing}>
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-dropdown-group": DropdownGroup
  }
}
