import { LitElement, html, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import * as chevronIconRight from "@nordhealth/icons/lib/assets/arrow-right.js"
import * as chevronIconLeft from "@nordhealth/icons/lib/assets/arrow-left.js"
import * as altKeyIcon from "@nordhealth/icons/lib/assets/keyboard-option.js"

import { ICommandMenuAction } from "./ICommandMenuAction.js"
import { DirectionController } from "../common/controllers/DirectionController.js"
import { observe } from "../common/decorators/observe.js"
import Icon from "../icon/Icon.js"
import "../visually-hidden/VisuallyHidden.js"

import style from "./CommandMenuAction.scss"

const KEY_REGEX = /(?:Key|Digit)([A-Z0-9])/g
const isMacintosh = () => navigator.platform.indexOf("Mac") > -1

Icon.registerIcon(chevronIconLeft)
Icon.registerIcon(chevronIconRight)
Icon.registerIcon(altKeyIcon)

/**
 * Command Menu Action displays a single action that can be executed by the user. For usage examples, please see Command Menu component.
 *
 * @status internal
 */
@customElement("kabal-command-menu-action")
export default class CommandMenuAction extends LitElement {
  static styles = style

  private direction = new DirectionController(this)

  @property({ type: Object }) command!: ICommandMenuAction

  @property({ type: Boolean }) selected = false

  override render() {
    return html`
      <div
        class=${classMap({
          "n-selected": this.selected,
          "n-command": true,
        })}
      >
        <div aria-hidden="true" class="n-command-icon">
          <kabal-icon size="s" name=${this.getIconName()}></kabal-icon>
        </div>
        <div class="n-title">${this.command.title}</div>
        ${this.renderShortcut()}
      </div>
    `
  }

  /**
   * Scroll to show element
   */
  @observe("selected")
  protected ensureInView() {
    if (this.selected) {
      requestAnimationFrame(() => this.scrollIntoView({ block: "nearest" }))
    }
  }

  private getIconName() {
    if (this.command.icon) {
      return this.command.icon
    }

    return this.direction.isLTR ? chevronIconRight.title : chevronIconLeft.title
  }

  private renderShortcut() {
    if (!this.command.shortcut) {
      return nothing
    }

    const keys = this.command.shortcut.replace(KEY_REGEX, "$1")

    return html`
      <kabal-visually-hidden>, ${keys}</kabal-visually-hidden>

      <div aria-hidden="true" class="n-shortcuts">
        ${keys
          .split("+")
          .map(
            key =>
              html`<div class="n-shortcut">
                ${key.toLowerCase() === "alt" && isMacintosh()
                  ? html`<kabal-icon name=${altKeyIcon.title} size="s"></kabal-icon>`
                  : key}
              </div>`
          )}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-command-menu-action": CommandMenuAction
  }
}
