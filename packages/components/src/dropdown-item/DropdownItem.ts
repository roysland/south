import { LitElement, html, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { ref } from "lit/directives/ref.js"
import { FocusableMixin } from "../common/mixins/FocusableMixin.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./DropdownItem.scss"

/**
 * Dropdown item populates dropdown with actions. Items can be
 * placed either inside a dropdown group or directly inside a
 * dropdown component.
 *
 * @status ready
 * @category action
 * @slot - The dropdown item content.
 * @slot start - Used to place content before dropdown item text. Typically used for icons.
 * @slot end - Used to place content after dropdown item text. Typically used for icons.
 */
@customElement("nord-dropdown-item")
export default class DropdownItem extends FocusableMixin(LitElement) {
  static styles = [componentStyle, style]

  /**
   * The url the dropdown item should link to.
   */
  @property({ reflect: true }) href?: string

  render() {
    const link = (content: TemplateResult) =>
      html`<a href=${ifDefined(this.href)} ${ref(this.focusableRef)} class="n-dropdown-item">${content}</a>`
    const button = (content: TemplateResult) =>
      html`<button ${ref(this.focusableRef)} class="n-dropdown-item">${content}</button>`

    const container = this.href ? link : button

    return container(html`
      <slot name="start"></slot>
      <span class="n-truncate"><slot></slot></span>
      <slot name="end"></slot>
    `)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-dropdown-item": DropdownItem
  }
}
