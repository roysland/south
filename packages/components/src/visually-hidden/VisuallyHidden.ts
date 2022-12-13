import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"
import style from "./VisuallyHidden.scss"

/**
 * Visually hidden is used when an element needs to be available
 * to assistive technologies like screen readers, but be otherwise
 * hidden.
 *
 * @status ready
 * @category text
 * @slot - The visually hidden content.
 */
@customElement("nord-visually-hidden")
export default class VisuallyHidden extends LitElement {
  static styles = style

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-visually-hidden": VisuallyHidden
  }
}
