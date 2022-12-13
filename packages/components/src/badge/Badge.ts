import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import * as cancelledIcon from "@nordhealth/icons/lib/assets/interface-cancelled-small.js"
import * as completeIcon from "@nordhealth/icons/lib/assets/interface-complete-small.js"
import * as incompleteIcon from "@nordhealth/icons/lib/assets/interface-incomplete-small.js"
import * as partiallyCompleteIcon from "@nordhealth/icons/lib/assets/interface-partially-complete-small.js"
import Icon from "../icon/Icon.js"

import componentStyle from "../common/styles/Component.css"
import style from "./Badge.css"

Icon.registerIcon(cancelledIcon)
Icon.registerIcon(completeIcon)
Icon.registerIcon(incompleteIcon)
Icon.registerIcon(partiallyCompleteIcon)

const iconMap: Record<Exclude<Badge["progress"], undefined>, string> = {
  cancelled: cancelledIcon.title,
  complete: completeIcon.title,
  incomplete: incompleteIcon.title,
  "partially-complete": partiallyCompleteIcon.title,
}

/**
 * Badges are used to inform users of the status of an object
 * or of an action that’s been taken. Commonly used in tabular
 * data to indicate status.
 *
 * @status ready
 * @category text
 * @slot - The badge content.
 */
@customElement("nord-badge")
export default class Badge extends LitElement {
  static styles = [componentStyle, style]

  /**
   * The type of badge.
   * Determines the background color of the badge.
   */
  @property({ reflect: true }) type?: "warning" | "success" | "danger" | "highlight" | "info" | "neutral" | "progress" =
    "neutral"

  /**
   * The progress of the badge. Displays a progress
   * indicator next to the label.
   */
  @property() progress?: "cancelled" | "complete" | "incomplete" | "partially-complete"

  render() {
    const icon = this.progress ? iconMap[this.progress] : ""

    return html`
      <span class="n-badge">
        <nord-icon name=${icon} size="xxs" ?hidden=${!icon}></nord-icon>
        <slot></slot>
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-badge": Badge
  }
}
