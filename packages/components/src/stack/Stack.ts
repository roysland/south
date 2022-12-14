import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import componentStyle from "../common/styles/Component.scss"
import style from "./Stack.scss"

/**
 * Stack component manages layout of immediate children along the
 * vertical or horizontal axis with optional spacing between each child.
 *
 * @status ready
 * @category structure
 * @slot - The stack content.
 *
 * @cssprop [--n-stack-gap=var(--n-space-m)] - Controls the spacing between items, using our [spacing tokens](/tokens/#space).
 */
@customElement("kabal-stack")
export default class Stack extends LitElement {
  static styles = [componentStyle, style]

  /**
   * The space injected between components.
   */
  @property({ reflect: true }) gap: "none" | "s" | "m" | "l" | "xl" | "xxl" = "m"

  /**
   * The direction of the stack.
   */
  @property({ reflect: true }) direction: "vertical" | "horizontal" = "vertical"

  /**
   * How to align the child items inside the stack.
   */
  @property({ reflect: true, attribute: "align-items" }) alignItems?: "center" | "start" | "end" | "stretch" = "stretch"

  /**
   * This property is deprecated and will be removed in a future version. We recommend using standard [CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) over this property. Please see the [updated usage example](/components/stack/?example=using+responsive+media+query).
   * @deprecated
   */
  @property({ reflect: true, type: Boolean }) responsive = false

  /**
   * Defines whether the Stack items are forced in a single line
   * or can be flowed into multiple lines.
   */
  @property({ reflect: true, type: Boolean }) wrap = false

  /**
   * How to justify the child items inside the stack.
   */
  @property({ reflect: true, attribute: "justify-content" }) justifyContent?:
    | "center"
    | "start"
    | "end"
    | "baseline"
    | "space-between"
    | "space-around"
    | "space-evenly"

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-stack": Stack
  }
}
