import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./Skeleton.scss"

/**
 * Skeletons are used to provide a low fidelity representation of content
 * before it appears in a view. This improves the perceived loading time
 * for our users.
 *
 * @status new
 * @category feedback
 *
 * @cssprop [--n-skeleton-border-radius=var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 * @cssprop [--n-skeleton-color=var(--n-color-border)] - Controls the main color of the skeleton, using our [color tokens](/tokens/#color).
 * @cssprop [--n-skeleton-sheen-color=var(--n-color-border-strong)] - Controls the sheen color of the skeleton, using our [color tokens](/tokens/#color).
 */
@customElement("nord-skeleton")
export default class Skeleton extends LitElement {
  static styles = [componentStyle, style]

  /**
   * Determines which animation effect the skeleton will use.
   */
  @property() effect: "pulse" | "sheen" | "none" = "none"

  render() {
    return html`
      <div class="n-skeleton" aria-hidden="true">
        <div class="n-skeleton-indicator"></div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-skeleton": Skeleton
  }
}
