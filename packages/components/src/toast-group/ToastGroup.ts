import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.css"
import Toast from "../toast/Toast.js"
import style from "./ToastGroup.css"

type ToastOptions = Partial<Pick<Toast, "variant" | "autoDismiss">>

/**
 * Toast group is used to position and style a group of toasts, whilst ensuring they are announced by screen readers.
 *
 * @status ready
 * @category feedback
 * @slot - Default slot in which to place toasts.
 */
@customElement("nord-toast-group")
export default class ToastGroup extends LitElement {
  static styles = [componentStyle, style]

  render() {
    return html`
      <div class="n-toast-group" role="log" aria-relevant="additions">
        <slot></slot>
      </div>
    `
  }

  /**
   * Convenience method for creating and adding a toast to the group.
   * @param {string} text - The text/message of the toast.
   * @param options - An optional object for configuring the toast's `variant` and `autoDismiss`.
   * @returns {Toast} The toast instance.
   */
  addToast(text: string, options: ToastOptions = {}) {
    const { variant, autoDismiss } = options
    const toast = document.createElement("nord-toast")

    if (variant) {
      toast.variant = variant
    }

    if (autoDismiss != null) {
      toast.autoDismiss = autoDismiss
    }

    toast.textContent = text
    this.appendChild(toast)

    return toast
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-toast-group": ToastGroup
  }
}
