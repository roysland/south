/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, nothing } from "lit"
import { customElement, property, query, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { styleMap } from "lit/directives/style-map.js"
import { DirectionController } from "../common/controllers/DirectionController.js"
import { EventController } from "../common/controllers/EventController.js"
import { LightDismissController } from "../common/controllers/LightDismissController.js"
import { SlotController } from "../common/controllers/SlotController.js"
import { observe } from "../common/decorators/observe.js"
import { cond } from "../common/directives/cond.js"
import { Events, fsm, States } from "../common/fsm.js"
import { clamp } from "../common/number.js"
import { storage } from "../common/storage.js"

import "../nav-toggle/NavToggle.js"

import componentStyle from "../common/styles/Component.scss"
import stickyStyle from "../common/styles/Sticky.scss"
import style from "./Layout.scss"

const NAV_DEFAULT_WIDTH = 250
const NAV_MIN_WIDTH = 220
const NAV_MAX_WIDTH = 400
const NAV_COLLAPSE_WIDTH = 100
const NAV_RESIZE_STEP = 30
const NAV_PEEK_DELAY = 300

const mediaQuery = matchMedia("(min-width: 768px)")
const store = storage("nord-layout.navWidth", NAV_DEFAULT_WIDTH)

const navMachine = fsm({
  opened: {
    toggle: "closed",
    close: "closed",
  },
  closed: {
    toggle: "opened",
    open: "opened",
    focusin: "peek",
    pointerenter: "peek",
  },
  peek: {
    toggle: "opened",
    focusout: "unpeek",
    pointerleave: "wait",
    dropdownOpen: "blocked",
    click: "unpeek",
    open: "opened",
  },
  blocked: {
    dropdownClose: "peek",
    open: "opened",
  },
  wait: {
    toggle: "opened",
    focusin: "peek",
    pointerenter: "peek",
    timeout: "unpeek",
  },
  unpeek: {
    toggle: "opened",
    focusin: "peek",
    pointerenter: "peek",
    transitionend: "closed",
  },
})

type NavState = States<typeof navMachine>
type NavEvent = Events<typeof navMachine>

function isElement(el: any): el is Element {
  return el != null && el.nodeType === Node.ELEMENT_NODE
}

/**
 * Layout component is used to create the main layout of an app. Layout
 * currently comes with one main configuration: two-column.
 *
 * @status ready
 * @category structure
 * @slot - The default main section content.
 * @slot nav - Used to place content inside the navigation sidebar.
 * @slot header - Used to place content inside the header section.
 * @slot drawer - Used to place additional content/details relating to a selected item.
 * @slot nav-toggle - Used to place a own nav-toggle component, for cases where you might need to add a tooltip.
 *
 * @cssprop [--n-layout-padding=var(--n-space-l)] - Controls the padding around the main layout area (the main slot), using our [spacing tokens](/tokens/#space).
 * @cssprop [--n-layout-drawer-inline-size=320px] - Controls the width of the drawer area, when used.
 * @cssprop [--n-layout-background-color=var(--n-color-background)] - Controls the background color of the layout, using [color tokens](/tokens/#color).
 */
@customElement("nord-layout")
export default class Layout extends LitElement {
  static styles = [componentStyle, stickyStyle, style]

  private peekTimeoutId?: ReturnType<typeof setTimeout>
  private resizeObserver = new ResizeObserver(entries => {
    this.stickySize = Math.round(entries[0].borderBoxSize[0].blockSize)
  })

  private navSlot = new SlotController(this, "nav")
  private drawerSlot = new SlotController(this, "drawer")
  private direction = new DirectionController(this)
  private events = new EventController(this)
  private lightDismiss = new LightDismissController(this, {
    isOpen: () => this.navState === "opened" && !this.wideScreen,
    onDismiss: () => this.navTransition("close"),
    isDismissible: node => node !== this.navEl,
  })

  @query(".n-sticky", true) private stickyElement!: HTMLDivElement
  @query(".n-layout-nav", true) private navEl!: HTMLDivElement

  @state() private navWidth = store.value
  @state() private isDragging = false
  @state() private navState: NavState = mediaQuery.matches ? "opened" : "closed"
  @state() private wideScreen = mediaQuery.matches
  @state() private stickySize: number | null = 0

  /**
   * Controls whether the navigation is hidden off-screen or not.
   * Defaults to `true` for wide viewports, and `false` otherwise.
   */
  @property({ reflect: true, type: Boolean, attribute: "nav-open" }) navOpen: boolean = this.navState === "opened"

  /**
   * ID reference of element used to toggle the navigation.
   * This is deprecated, the layout component will now render its own nav toggle to simplify usage.
   * @deprecated
   */
  @property({ attribute: "nav-toggle" }) navToggle?: string

  /**
   * Controls the padding of the default main section slot. When set to “none”,
   * the nav and header slots will still have padding.
   */
  @property({ reflect: true }) padding: "m" | "none" = "m"

  /**
   * Controls whether the layout's header has sticky positioning.
   */
  @property({ type: Boolean, reflect: true }) sticky: boolean = false

  connectedCallback(): void {
    super.connectedCallback()

    this.events.listen(mediaQuery, "change", this.handleMediaQueryChange)

    this.events.listen(this, "click", e => {
      if (this.isNavToggle(e.target)) {
        this.handleToggleClick()
      }
    })
    this.events.listen(this, "mouseover", e => {
      if (this.isNavToggle(e.target)) {
        this.handleMouseEnter()
      }
    })
    this.events.listen(this, "mouseout", e => {
      if (this.isNavToggle(e.target)) {
        this.handleMouseLeave()
      }
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.resizeObserver.disconnect()
  }

  render() {
    const { navWidth, navState, navSlot, isDragging, direction } = this
    const adjustedNavWidth = navState === "opened" && this.wideScreen ? navWidth : NAV_DEFAULT_WIDTH
    const shouldRenderOwnNavToggle = navSlot.hasContent && !this.navToggle

    return html`
      <div
        class=${classMap({
          "n-layout": true,
          "n-rtl": direction.isRTL,
          "n-dragging": isDragging,
        })}
        style=${styleMap({
          "--_n-layout-nav-width": `${adjustedNavWidth}px`,
          "--_n-sticky-size": typeof this.stickySize === "number" ? `${this.stickySize}px` : null,
        })}
        data-nav=${navSlot.hasContent ? navState : "closed"}
        data-screen=${this.wideScreen ? "wide" : "narrow"}
      >
        <div
          class="n-layout-nav"
          ?hidden=${navSlot.isEmpty}
          @focusin=${this.handleNavFocus}
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @open=${this.handleDropdownOpen}
          @close=${this.handleDropdownClose}
        >
          <slot name="nav"></slot>
          <div
            class="n-resize"
            role="separator"
            aria-orientation="vertical"
            tabindex="0"
            @pointerdown=${cond(navState === "opened", this.startDragging)}
            @pointermove=${cond(isDragging, this.handleDrag)}
            @pointerleave=${this.stopDragging}
            @pointerup=${this.stopDragging}
            @keydown=${this.handleKeyboardResize}
          ></div>
        </div>

        <div
          class=${classMap({ "n-layout-main": true, "n-has-own-nav-toggle": shouldRenderOwnNavToggle })}
          @focusin=${this.handleMainFocus}
          @click=${this.handleClick}
        >
          <div class=${classMap({ "n-has-drawer": this.drawerSlot.hasContent })}>
            <div class="n-layout-header n-sticky">
              ${shouldRenderOwnNavToggle ? this.renderNavToggle() : nothing}
              <slot name="header"></slot>
            </div>
            <main>
              <slot></slot>
            </main>
          </div>
          <aside ?hidden=${this.drawerSlot.isEmpty}>
            <slot name="drawer"></slot>
          </aside>
        </div>
      </div>
    `
  }

  private renderNavToggle() {
    /* eslint-disable lit-a11y/mouse-events-have-key-events */
    return html`
      <div class="n-nav-toggle-container">
        <slot
          name="nav-toggle"
          @click=${this.handleToggleClick}
          @mouseover=${this.handleMouseEnter}
          @mouseout=${this.handleMouseLeave}
        >
          <nord-nav-toggle></nord-nav-toggle>
        </slot>
      </div>
    `
    /* eslint-enable lit-a11y/mouse-events-have-key-events */
  }

  @observe("sticky", "updated")
  protected handleStickyChange(prev: boolean) {
    if (this.sticky === true) {
      this.resizeObserver.observe(this.stickyElement, { box: "border-box" })
    } else if (prev === true && this.sticky === false) {
      this.resizeObserver.unobserve(this.stickyElement)
      this.stickySize = null
    }
  }

  @observe("navWidth", "updated")
  protected handleNavWidthChange() {
    store.value = this.navWidth
  }

  @observe("navState")
  protected handleNavStateChange(prev: NavState) {
    if (prev === "wait" && this.peekTimeoutId) {
      clearTimeout(this.peekTimeoutId)
    }
    if (prev === "unpeek") {
      this.navEl.removeEventListener("transitionend", this.handleTransitionEnd)
    }

    switch (this.navState) {
      case "closed":
        this.navOpen = false
        break
      case "opened":
        this.navOpen = true
        break
      case "wait":
        this.peekTimeoutId = setTimeout(() => this.navTransition("timeout"), NAV_PEEK_DELAY)
        break
      case "unpeek":
        this.navEl.addEventListener("transitionend", this.handleTransitionEnd, { once: true })
        break
      default:
        break
    }
  }

  @observe("navOpen", "updated")
  protected handleOpenChange() {
    if (!this.isDragging) {
      // when opening nav, it should restore to default width (or larger).
      // unless it is being dragged, in which case the drag width wins
      this.setNavWidth(Math.max(this.navWidth, NAV_DEFAULT_WIDTH))
    }

    this.navTransition(this.navOpen ? "open" : "close")
  }

  /* ---------------------------------------------
  / NAVIGATION OPEN/CLOSE LOGIC
  / --------------------------------------------- */

  private navTransition(event: NavEvent) {
    this.navState = navMachine.transition(this.navState, event)
  }

  private handleClick() {
    this.navTransition("click")
  }

  private handleDropdownOpen(e: Event) {
    const target = e.target as Element

    if (target.localName === "nord-dropdown") {
      this.navTransition("dropdownOpen")
    }
  }

  private handleDropdownClose(e: Event) {
    const target = e.target as Element

    if (target.localName === "nord-dropdown") {
      this.navTransition("dropdownClose")
    }
  }

  private handleMediaQueryChange = () => {
    this.wideScreen = mediaQuery.matches
    this.navTransition(this.wideScreen ? "open" : "close")
  }

  private handleToggleClick = () => {
    this.navTransition("toggle")
  }

  private handleNavFocus = () => {
    this.navTransition("focusin")
  }

  private handleMainFocus = () => {
    this.navTransition("focusout")
  }

  private handleMouseEnter = () => {
    if (this.wideScreen) {
      this.navTransition("pointerenter")
    }
  }

  private handleMouseLeave = () => {
    this.navTransition("pointerleave")
  }

  private handleTransitionEnd = () => {
    this.navTransition("transitionend")
  }

  private isNavToggle(node: EventTarget | null) {
    return Boolean(this.navToggle) && isElement(node) && node.id === this.navToggle
  }

  /* ---------------------------------------------
  / RESIZE LOGIC
  / --------------------------------------------- */

  private handleKeyboardResize(e: KeyboardEvent) {
    const {
      navWidth,
      direction: { isLTR },
    } = this

    switch (e.key) {
      case "ArrowLeft":
        this.setNavWidth(navWidth + (isLTR ? -NAV_RESIZE_STEP : NAV_RESIZE_STEP))
        break
      case "ArrowRight":
        this.setNavWidth(navWidth + (isLTR ? NAV_RESIZE_STEP : -NAV_RESIZE_STEP))
        break
      case "Enter":
        this.navTransition("toggle")
        break
      case "Home":
        this.setNavWidth(NAV_MIN_WIDTH)
        break
      case "End":
        this.setNavWidth(NAV_MAX_WIDTH)
        break
      default:
        return
    }

    e.preventDefault()
  }

  private setNavWidth(width: number) {
    this.navWidth = clamp(Math.round(width), NAV_MIN_WIDTH, NAV_MAX_WIDTH)
  }

  private startDragging(e: PointerEvent) {
    if (e.button === 0) {
      const target = e.target as Element
      target.setPointerCapture(e.pointerId)
      this.isDragging = true
    }
  }

  private stopDragging() {
    this.isDragging = false
  }

  private handleDrag(e: PointerEvent) {
    const width = this.direction.isRTL ? this.clientWidth - e.clientX : e.clientX

    this.setNavWidth(width)
    this.navTransition(width >= NAV_COLLAPSE_WIDTH ? "open" : "close")
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-layout": Layout
  }
}
