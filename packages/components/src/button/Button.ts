import { LitElement, html, nothing, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, ref } from "lit/directives/ref.js"
import { EventController } from "../common/controllers/EventController.js"
import { LightDomController } from "../common/controllers/LightDomController.js"
import { cond } from "../common/directives/cond.js"

import "../spinner/Spinner.js"

import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"
import componentStyle from "../common/styles/Component.scss"
import style from "./Button.scss"
import { SlotController } from "../common/controllers/SlotController.js"

/**
 * Buttons are used for interface actions. Primary style should be
 * used only once per section for main call-to-action, while other
 * styles can appear more frequently.
 *
 * @status ready
 * @category action
 * @slot - The button content
 * @slot start - Used to place content at the start of button text. Typically used for icons.
 * @slot end - Used to place content at the end of button text. Typically used for icons.
 *
 * @cssprop [--n-button-border-radius=var(--n-border-radius-s)] - Controls the rounded corners of the button, using [border radius tokens](/tokens/#border-radius).
 * @cssprop [--n-button-gap=var(--n-space-s)] - Controls the spacing between items within the button, using our [spacing tokens](/tokens/#space).
 * @cssprop [--n-button-gradient=linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.013) 100%))] - Controls the overlayed gradient background on the button.
 * @cssprop [--n-button-background-color=var(--n-color-button)] - Controls the background color of the button, using [color tokens](/tokens/#color).
 * @cssprop [--n-button-border-color=var(--n-color-border-strong)] - Controls the border color of the button, using [color tokens](/tokens/#color).
 * @cssprop [--n-button-text-align=center] - Controls the text alignment for the text in the button.
 * @cssprop [--n-button-box-shadow=var(--n-box-shadow)] - Controls the surrounding shadow, using [box shadow tokens](/tokens/#box-shadow).
 */
@customElement("kabal-button")
export default class Button extends InputMixin(FocusableMixin(LitElement)) {
  static styles = [componentStyle, style]

  private defaultSlot = new SlotController(this)
  private buttonRef = createRef<HTMLButtonElement>()
  private events = new EventController(this)
  private lightDom = new LightDomController(this, {
    render: () => this.renderLightDom(),
  })

  /**
   * The style variant of the button.
   */
  @property({ reflect: true }) variant: "default" | "primary" | "dashed" | "plain" | "danger" | "switch" = "default"

  /**
   * The type of the button.
   */
  @property({ reflect: true }) type: "button" | "submit" | "reset" = "submit"

  /**
   * The size of the button.
   * This affects font-size and padding.
   */
  @property({ reflect: true }) size: "s" | "m" | "l" = "m"

  /**
   * @private
   * This does not need to be documented,
   * since it is only for forwarding the aria-expanded attribute
   * to the internal button element.
   */
  @property({ attribute: "aria-expanded" }) accessibleExpanded?: "true" | "false"

  /**
   * @private
   * This does not need to be documented,
   * since it is only for forwarding the aria-haspopup attribute
   * to the internal button element.
   */
  @property({ attribute: "aria-haspopup" }) accessibleHasPopup?:
    | "false"
    | "true"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog"

  /**
   * When provided, renders the button as a link,
   * with its href attribute set to the given value.
   */
  @property({ reflect: true }) href?: string

  /**
   * When provided together with a href property, the button will
   * trigger a file download instead of a page visit.
   */
  @property({ type: Boolean }) download = false

  /**
   * When provided together with a href property, determines where
   * to open the linked URL. The keywords have special meanings for
   * where to load the URL: “_self” means the current browsing context,
   * “_blank” usually a new tab but users can configure browsers this to
   * open a new window instead, “_parent” means the parent browsing
   * context of the current one, but if no parent exists, behaves as
   * _self, and finally “top” means the topmost browsing context.
   */
  @property() target: "_self" | "_blank" | "_parent" | "_top" = "_self"

  /**
   * Controls whether the button expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  /**
   * Controls whether the button is in loading state. Please note that the spinner
   * is hidden from assistive technologies, so you need to make sure to announce
   * the loading state to e.g. screen reader users. We also recommend disabling
   * all user interactions on the button itself while in loading state.
   */
  @property({ reflect: true, type: Boolean }) loading = false

  connectedCallback() {
    super.connectedCallback()
    this.events.listen(this, "click", this.handleOuterClick, true)
  }

  render() {
    const isSwitch = this.variant === "switch"
    const isDropdownToggle = this.assignedSlot?.name === "toggle"
    const isIconButton = this.defaultSlot.assigned.some(node => node.localName === "kabal-icon")
    const shouldShowDropdownIcon = (isSwitch || (isDropdownToggle && !isIconButton)) && !this.href

    const innards = html`
      <slot name="start"></slot>
      <div class="n-content">
        <slot></slot>
      </div>
      <kabal-spinner
        class="n-button-spinner"
        color="currentColor"
        ?hidden=${!this.loading || Boolean(this.href)}
      ></kabal-spinner>
      <slot name="end">
        ${shouldShowDropdownIcon ? html`<kabal-icon name="interface-dropdown-small"></kabal-icon>` : nothing}
      </slot>
    `

    return this.href ? this.renderLink(innards) : this.renderButton(innards)
  }

  /**
   * We jump through some hoops here to ensure the link is treated correctly when "disabled".
   * Links cannot be disabled natively, so we need to rely on some aria magic to get the correct semantics.
   * Along with the advice in the article below, we also set tabindex to "-1", so it is taken out of tab order.
   *
   * @see https://www.scottohara.me/blog/2021/05/28/disabled-links.html
   */
  private renderLink(innards: TemplateResult) {
    return html`
      <a
        ${ref(this.focusableRef)}
        class="n-button"
        target=${this.target}
        ?download=${this.download}
        href=${cond(this.disabled, nothing, this.href)}
        tabindex=${cond(this.disabled, "-1")}
        aria-disabled=${cond(this.disabled, "true")}
        role=${cond(this.disabled, "link")}
        >${innards}
      </a>
    `
  }

  private renderButton(innards: TemplateResult) {
    return html`
      <slot name="proxy" @slotchange=${this.handleProxyChange}></slot>
      <button
        ${ref(this.focusableRef)}
        class="n-button"
        ?disabled=${this.disabled}
        name=${cond(this.name)}
        value=${cond(this.value)}
        @click=${this.handleClick}
        aria-disabled=${cond(this.loading, "true")}
        aria-expanded=${cond(this.accessibleExpanded)}
        aria-haspopup=${cond(this.accessibleHasPopup)}
      >
        ${innards}
      </button>
    `
  }

  private renderLightDom() {
    if (this.href || !this.form) {
      return nothing
    }

    return html`
      <button
        ${ref(this.buttonRef)}
        slot="proxy"
        name=${cond(this.name)}
        value=${cond(this.value)}
        ?disabled=${this.disabled}
        form=${cond(this.getAttribute("form"))}
        type=${this.type}
      ></button>
    `
  }

  private handleOuterClick = (e: MouseEvent) => {
    // we want to avoid emitting click events when a click
    // happens in blank space in the host, but not on the button
    // so we stop propagation of any events if click didn't happen on the internal or proxy button
    const isInternalButton = e
      .composedPath()
      .some(node => node === this.focusableRef.value || node === this.buttonRef.value)

    if (!isInternalButton) {
      e.stopPropagation()
    }
  }

  private handleClick(e: Event) {
    if (this.buttonRef.value) {
      // prevents two events: one from internal button, one from proxy button
      e.stopPropagation()
      this.buttonRef.value.click()
    }
  }

  /**
   * React/Vue etc may remove our proxy button when updating button text, since they are unaware of its existence.
   * So we listen for a slotchange event, and if the element is no longer connected to the DOM we add it back in.
   */
  private handleProxyChange(e: Event) {
    const slot = e.target as HTMLSlotElement
    const proxyButton = this.buttonRef.value

    if (proxyButton && proxyButton.assignedSlot !== slot) {
      this.appendChild(proxyButton)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-button": Button
  }
}
