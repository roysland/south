import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"
import { ref } from "lit/directives/ref.js"
import { classMap } from "lit/directives/class-map.js"
import * as unlockIcon from "@nordhealth/icons/lib/assets/navigation-toggle.js"
import * as lockIcon from "@nordhealth/icons/lib/assets/navigation-toggle-lock.js"

import { LocalizeController } from "../localization/LocalizeController.js"
import { DirectionController } from "../common/controllers/DirectionController.js"
import { FocusableMixin } from "../common/mixins/FocusableMixin.js"

import "../button/Button.js"
import Icon from "../icon/Icon.js"
import "../visually-hidden/VisuallyHidden.js"

import componentStyle from "../common/styles/Component.css"
import style from "./NavToggle.css"

Icon.registerIcon(unlockIcon)
Icon.registerIcon(lockIcon)

/**
 * Nav toggle is meant for hiding and showing the primary navigation.
 * This component is used internally in the Layout component, but can also be
 * used separate to further customize the behaviour.
 *
 * @status new
 * @category action
 */
@customElement("nord-nav-toggle")
export default class NavToggle extends FocusableMixin(LitElement) {
  static styles = [componentStyle, style]

  private direction = new DirectionController(this)
  private localization = new LocalizeController<"nord-nav-toggle">(this)

  render() {
    return html`
      <nord-button
        variant="plain"
        size="s"
        ${ref(this.focusableRef)}
        class=${classMap({ "is-rtl": this.direction.isRTL })}
      >
        <nord-visually-hidden>${this.localization.term("label")}</nord-visually-hidden>
        <nord-icon size="m" color="var(--n-color-icon)" name=${unlockIcon.title} class="nav-unlock"></nord-icon>
        <nord-icon size="m" color="var(--n-color-text)" name=${lockIcon.title} class="nav-lock"></nord-icon>
      </nord-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-nav-toggle": NavToggle
  }
}
