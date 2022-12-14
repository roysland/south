import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import * as warningIcon from "@nordhealth/icons/lib/assets/interface-help-2.js"
import * as dangerIcon from "@nordhealth/icons/lib/assets/interface-warning.js"
import * as infoIcon from "@nordhealth/icons/lib/assets/interface-info.js"
import * as successIcon from "@nordhealth/icons/lib/assets/interface-checked-circle.js"
import Icon from "../icon/Icon.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./Banner.scss"

Icon.registerIcon(warningIcon)
Icon.registerIcon(dangerIcon)
Icon.registerIcon(infoIcon)
Icon.registerIcon(successIcon)

const iconMap: Record<Banner["variant"], string> = {
  warning: warningIcon.title,
  danger: dangerIcon.title,
  info: infoIcon.title,
  success: successIcon.title,
}

/**
 * Banner informs users about important changes or conditions in the
 * interface. Use this component if you need to communicate to users
 * in a prominent way.
 *
 * @status ready
 * @category feedback
 * @slot - default slot
 *
 * @cssprop [--n-banner-border-radius=var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 * @cssprop [--n-banner-box-shadow=var(--n-box-shadow-card)] - Controls the surrounding shadow, using [box shadow tokens](/tokens/#box-shadow).
 */
@customElement("kabal-banner")
export default class Banner extends LitElement {
  static styles = [componentStyle, style]

  /**
   * The style variant of the banner.
   */
  @property({ reflect: true }) variant: "info" | "danger" | "success" | "warning" = "info"

  render() {
    const icon = iconMap[this.variant] || iconMap.info

    return html`
      <div class="n-banner" role="alert">
        <kabal-stack align-items="start" direction="horizontal">
          <kabal-icon name=${icon} size="m"></kabal-icon>
          <div class="n-banner-content">
            <slot></slot>
          </div>
        </kabal-stack>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-banner": Banner
  }
}
