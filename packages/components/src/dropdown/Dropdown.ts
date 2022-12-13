import { LitElement, html } from "lit"
import { customElement, property, query } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { FloatingMixin } from "../common/mixins/FloatingComponentMixin.js"

import type Popout from "../popout/Popout.js"
import "../popout/Popout.js"

import componentStyle from "../common/styles/Component.css"
import style from "./Dropdown.css"

/**
 * Dropdown menu displays a list of actions or selectable options for
 * a user. Dropdown uses popout component internally to create
 * the overlay functionality.
 *
 * @status ready
 * @category action
 * @slot - The dropdown content.
 * @slot toggle - Used to place the toggle for dropdown.
 *
 * @cssprop [--n-dropdown-size=250px] - Controls the inline size, or width, of the dropdown. Will resize up to 1.5 times to account for larger content.
 */
@customElement("nord-dropdown")
export default class Dropdown extends FloatingMixin(LitElement) {
  static styles = [componentStyle, style]

  /**
   * we delegate focus, to ensure focus does not move to body if you click
   * some whitespace or a dropdown-group heading, as this would close the dropdown
   * @internal
   */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }

  @query("nord-popout", true) private popout!: Popout

  /**
   * Controls whether the toggle slot expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  /**
   * The size of the dropdown. This affects the minimum and maximum inline-size
   * of the dropdown.
   */
  @property({ reflect: true }) size: "s" | "m" | "l" = "m"

  connectedCallback() {
    super.connectedCallback()

    const toggle = this.querySelector(`[slot="toggle"]`)
    toggle?.setAttribute("aria-haspopup", "true")
  }

  render() {
    return html`
      <div class="n-dropdown" @focusout=${this.handleBlur}>
        <slot name="toggle" aria-controls="popout"></slot>
        <nord-popout
          id="popout"
          align=${ifDefined(this.align)}
          position=${ifDefined(this.position)}
          ?open=${this.open}
          @open=${this.handleOpen}
          @close=${this.handleClose}
        >
          <div class="n-dropdown-content">
            <slot></slot>
          </div>
        </nord-popout>
      </div>
    `
  }

  private handleBlur(e: FocusEvent) {
    const relatedTarget = e.relatedTarget as Node

    // Safari will set relatedTarget to null when clicking on the trigger button
    // because it doesn't focus buttons on click.
    // this caused weird behavior where the dropdown closed _and_ opened with a single click.
    // so we only run this logic if relatedTarget is set, which sidesteps this issue
    if (relatedTarget && !this.contains(relatedTarget)) {
      this.popout.hide(false)
    }
  }

  private handleOpen() {
    this.open = true
    this.querySelector("nord-dropdown-item")?.focus()
  }

  private handleClose() {
    this.open = false
  }

  /**
   * Hide the dropdown programmatically.
   * @param moveFocusToButton A boolean option to move the focus to the original button that opens the dropdown.
   */
  hide(moveFocusToButton?: boolean) {
    this.popout.hide(moveFocusToButton)
  }

  /**
   * Show the dropdown programmatically.
   */
  show() {
    this.popout.show()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-dropdown": Dropdown
  }
}
