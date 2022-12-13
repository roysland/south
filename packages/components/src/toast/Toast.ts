import { LitElement, html } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { customElement, property, query, state } from "lit/decorators.js"
import * as closeIcon from "@nordhealth/icons/lib/assets/interface-close.js"

import Icon from "../icon/Icon.js"
import componentStyle from "../common/styles/Component.scss"
import style from "./Toast.scss"
import { NordEvent } from "../common/events.js"
import { EventController } from "../common/controllers/EventController.js"
import { observe } from "../common/decorators/observe.js"

Icon.registerIcon(closeIcon)

/**
 * Toasts are non-disruptive messages that appear in the interface
 * to provide quick, at-a-glance feedback on the outcome of an action.
 *
 * @status ready
 * @category feedback
 * @slot - Default slot used for the toast text/message.
 * @fires dismiss - Fired when the toast is dismissed (via user action or auto-dismiss), and its exit animation has completed. This event should be used to remove the dismissed toast from the DOM.
 */
@customElement("nord-toast")
export default class Toast extends LitElement {
  static styles = [componentStyle, style]

  private timeoutId?: ReturnType<typeof setTimeout>
  private events = new EventController(this)

  @query(".n-toast", true) private toast!: HTMLElement
  @state() private dismissed = false

  /**
   * The style variant of the toast.
   */
  @property({ reflect: true }) variant: "default" | "danger" = "default"

  /**
   * Timeout in milliseconds before the toast is automatically dismissed.
   */
  @property({ type: Number, attribute: "auto-dismiss" }) autoDismiss? = 10000

  disconnectedCallback() {
    super.disconnectedCallback()
    clearTimeout(this.timeoutId)
  }

  /**
   * Programmatically dismiss the toast.
   * The returned promise resolves when toast's exit animation is complete.
   */
  dismiss() {
    this.dismissed = true
    clearTimeout(this.timeoutId)

    return new Promise<void>(resolve => {
      this.events.listen(
        this.toast,
        "animationend",
        () => {
          this.dispatchEvent(new NordEvent("dismiss"))
          resolve()
        },
        { once: true }
      )
    })
  }

  render() {
    return html`
      <div class=${classMap({ "n-toast": true, "n-dismissed": this.dismissed })}>
        <div class="n-toast-inner">
          <slot></slot>
        </div>

        <button class="n-dismiss" @click=${this.dismiss} aria-hidden="true">
          <nord-icon name="interface-close" size="s"></nord-icon>
        </button>
      </div>
    `
  }

  @observe("autoDismiss")
  protected handleAutoDismissChange() {
    clearTimeout(this.timeoutId)

    if (this.autoDismiss != null && this.autoDismiss >= 0) {
      setTimeout(() => this.dismiss(), this.autoDismiss)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-toast": Toast
  }
}
