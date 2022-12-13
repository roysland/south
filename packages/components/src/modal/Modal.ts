import { LitElement, html } from "lit"
import { customElement, property, query } from "lit/decorators.js"
import * as closeIcon from "@nordhealth/icons/lib/assets/interface-close-small.js"

import Icon from "../icon/Icon.js"
import { SlotController } from "../common/controllers/SlotController.js"
import { observe } from "../common/decorators/observe.js"
import { NordEvent } from "../common/events.js"

import componentStyle from "../common/styles/Component.scss"
import { LocalizeController } from "../localization/LocalizeController.js"
import style from "./Modal.scss"
import { ModalController } from "./ModalController.js"

Icon.registerIcon(closeIcon)

/**
 * Modal component is used to display content that temporarily blocks interactions
 * with the main view of an application. Modal should be used sparingly and
 * only when necessary.
 *
 * @status ready
 * @category overlay
 * @slot - Default slot
 * @slot header - Slot which holds the header of the modal, positioned next to the close button.
 * @slot footer - Slot which is typically used to hold call to action buttons, but can also be used to build custom footers.
 * @fires cancel - Dispatched before the modal has closed when a user attempts to dismiss a modal. Call `preventDefault()` on the event to prevent the modal closing.
 * @fires close - Dispatched when a modal is closed for any reason.
 *
 * @cssprop [--n-modal-padding-inline=var(--n-space-m)] - Controls the padding on the sides of the modal, using our [spacing tokens](/tokens/#space).
 * @cssprop [--n-modal-padding-block=var(--n-space-m)] - Controls the padding above and below the modal, using our [spacing tokens](/tokens/#space).
 * @cssprop [--n-modal-max-inline-size=620px] - Controls the width of the modal.
 */
@customElement("nord-modal")
export default class Modal extends LitElement {
  static styles = [componentStyle, style]

  /**
   * @internal
   * ensures clicking on the backdrop does not move focus to <body>,
   * which can causes issues with focus trapping, and returning focus on modal close,
   * when there are multiple modals.
   */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }

  @query(".n-modal", true) private modal!: HTMLDivElement
  @query(".n-modal-backdrop", true) private backdrop!: HTMLDivElement

  private headerSlot = new SlotController(this, "header")
  private featureSlot = new SlotController(this, "feature")
  private footerSlot = new SlotController(this, "footer")

  private localize = new LocalizeController<"nord-modal">(this)
  private modalController = new ModalController(this, {
    isOpen: () => this.open,
    onDismiss: () => this.handleDismiss(),
    dialog: () => this.modal,
    backdrop: () => this.backdrop,
    close: returnValue => this.close(returnValue),
  })

  /**
   * Controls whether the modal is open or not.
   */
  @property({ type: Boolean, reflect: true }) open = false

  /**
   * Controls the max-width of the modal when open.
   */
  @property({ reflect: true }) size: "s" | "m" | "l" = "m"

  /**
   * The reason why the modal was closed. This typically indicates
   * which button the user pressed to close the modal, though any value
   * can be supplied if the modal is programmatically closed.
   */
  @property({ attribute: false }) returnValue: string = ""

  /**
   * By default if a modal is too big for the browser window,
   * the entire modal will scroll. This setting changes that behavior
   * so that the body of the modal scrolls instead, with the modal
   * itself remaining fixed.
   */
  @property({ type: Boolean, reflect: true }) scrollable = false

  connectedCallback(): void {
    super.connectedCallback()

    this.setAttribute("role", "dialog")
    this.setAttribute("aria-modal", "true")
  }

  /**
   * Show the modal, automatically moving focus to the modal or a child
   * element with an `autofocus` attribute.
   */
  showModal() {
    this.open = true
  }

  /**
   * Programmatically close the modal.
   * @param returnValue An optional value to indicate why the modal was closed.
   */
  close(returnValue?: string) {
    this.open = false

    if (returnValue != null) {
      this.returnValue = returnValue
    }

    this.dispatchEvent(new NordEvent("close"))
  }

  /**
   * Programmatically focus the modal.
   * @param options An object which controls aspects of the focusing process.
   */
  focus(options?: FocusOptions) {
    this.modal.focus({ preventScroll: true, ...options })
  }

  render() {
    return html`
      <div class="n-modal-backdrop">
        <div class="n-modal" tabindex="0">
          <div class="n-modal-header n-rounded-top" ?hidden=${this.headerSlot.isEmpty}>
            <slot class="n-padded" name=${this.headerSlot.slotName}></slot>
            <button class="n-close" @click=${this.handleDismiss}>
              <nord-icon name="interface-close-small" size="s" label=${this.localize.term("closeLabel")}></nord-icon>
            </button>
          </div>

          <div class="n-modal-body">
            <slot
              name=${this.featureSlot.slotName}
              class=${this.headerSlot.isEmpty ? "n-rounded-top" : ""}
              ?hidden=${this.featureSlot.isEmpty}
            ></slot>
            <slot class="n-body-padded"></slot>
          </div>

          <div class="n-modal-footer n-padded" ?hidden=${this.footerSlot.isEmpty}>
            <slot name=${this.footerSlot.slotName}></slot>
          </div>
        </div>
      </div>
    `
  }

  @observe("open", "updated")
  protected handleOpenUpdated(prev: boolean) {
    if (this.open) {
      this.modalController.block()
    } else if (prev === true) {
      this.modalController.unblock()
    }
  }

  private handleDismiss() {
    // allow cancelling of close
    const allowed = this.dispatchEvent(new NordEvent("cancel", { cancelable: true }))

    if (allowed) {
      this.close()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-modal": Modal
  }
}
