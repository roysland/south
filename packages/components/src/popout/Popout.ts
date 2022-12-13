import { LitElement, html } from "lit"
import { customElement, property, query, state } from "lit/decorators.js"
import { computePosition, shift, offset, flip, hide, autoUpdate, Placement } from "@floating-ui/dom"
import { LightDismissController } from "../common/controllers/LightDismissController.js"
import { ScrollbarController } from "../common/controllers/ScrollbarController.js"
import { NordEvent } from "../common/events.js"
import { FloatingMixin } from "../common/mixins/FloatingComponentMixin.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./Popout.scss"
import { logicalToPhysical } from "../common/positioning.js"
import { DirectionController } from "../common/controllers/DirectionController.js"
import { observe } from "../common/decorators/observe.js"
import { EventController } from "../common/controllers/EventController.js"

/*
 * The breakpoint width to switch between "sheet" design and floating design
 */
const mediaQuery = matchMedia("(max-width: 35.9375em)")

/**
 * Popouts are small overlays that open on demand. They let users access additional content and actions without cluttering the page.
 *
 * @status ready
 * @category overlay
 * @slot - The popout content.
 */
@customElement("nord-popout")
export default class Popout extends FloatingMixin(LitElement) {
  static styles = [componentStyle, style]

  private targetElement!: HTMLElement
  private anchorElement!: Element
  private cleanupAutoUpdate?: ReturnType<typeof autoUpdate>

  @query(".n-popout", true) private popout!: HTMLDivElement

  private scrollBar = new ScrollbarController(this)

  /**
   * Handle dismissal of the popout, clicking outside the target button and popout.
   */
  private dismiss = new LightDismissController(this, {
    isOpen: () => this.open,
    onDismiss: e => this.hide(e.type !== "click"),
    isDismissible: node => node !== this.popout && node !== this.targetElement,
  })

  private events = new EventController(this)
  private direction = new DirectionController(this)

  @state() private computedPosition?: Placement

  @state() private smallViewport = mediaQuery.matches

  /**
   * The id for the active element to reference via aria-controls.
   */
  @property({ reflect: true }) id: string = ""

  /**
   * Set an optional anchor element to align against, replacing the triggering element.
   */
  @property({ reflect: true }) anchor?: string

  /**
   * Show the popout, moving focus to the calendar inside.
   */
  show() {
    if (this.open) {
      return
    }

    this.open = true

    // we should only focus once the popout is visible after render is complete
    this.updateComplete.then(() => {
      /**
       * Dispatched when the popout is opened.
       */
      this.dispatchEvent(new NordEvent("open"))
    })
  }

  /**
   * Hide the popout.
   * @param {boolean} moveFocusToButton prevent focus returning to the target
   * button. Default is true.
   */
  hide(moveFocusToButton = true) {
    if (!this.open) {
      return
    }

    this.open = false

    this.cleanupAutoUpdate?.()

    /**
     * Dispatched when the popout is closed.
     */
    this.dispatchEvent(new NordEvent("close"))

    if (moveFocusToButton) {
      this.targetElement.focus({ preventScroll: true })
    }
  }

  /**
   * Position the popout on load.
   */
  firstUpdated() {
    if (!this.smallViewport) {
      this.updatePosition()
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.targetElement = this.getToggle()
    this.anchorElement = this.anchor ? this.getAnchor() : this.targetElement

    this.events.listen(this.targetElement, "click", this.toggleOpen)
    this.events.listen(mediaQuery, "change", this.handleMediaQueryChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.cleanupAutoUpdate?.()
    this.targetElement.removeAttribute("aria-expanded")
  }

  render() {
    return html`
      <div
        class="n-popout ${this.computedPosition} is-${this.direction.dir}"
        aria-hidden=${this.open ? "false" : "true"}
        @transitionend=${this.enableScroll}
      >
        <slot></slot>
      </div>
    `
  }

  @observe("id")
  protected handleIdChange() {
    if (!this.id) {
      // eslint-disable-next-line no-console
      console.warn("NORD: popout requires an id attribute and value")
    }
  }

  @observe("open")
  protected handleOpenChange() {
    this.targetElement.setAttribute("aria-expanded", `${this.open}`)

    if (this.open) {
      if (this.smallViewport) {
        // hide scrollbar and prevent scroll on body
        this.scrollBar.lockScroll()
      } else {
        this.cleanupAutoUpdate = autoUpdate(this.anchorElement, this, this.updatePosition)
      }
    } else {
      this.cleanupAutoUpdate?.()
    }
  }

  private enableScroll = () => {
    // scrollbar should only be restored when the backdrop has transitioned
    // that way we avoid awkward double scrollbars.
    if (!this.open) {
      this.scrollBar.unlockScroll()
    }
  }

  /**
   * Get the position of the element toggling the popout
   * and position the popout underneath it, taking into account the optional placement.
   */
  private updatePosition = async () => {
    const { x, y, placement, middlewareData } = await computePosition(this.anchorElement, this, {
      strategy: "fixed",
      placement: logicalToPhysical(this.position, this.align, this.direction.dir),
      middleware: [
        offset(8),
        flip(),
        shift({
          padding: 8,
        }),
        hide(),
      ],
    })

    this.computedPosition = placement

    // use physical properties here since floating-ui
    // works exclusively in physical dimensions
    // we do all the mapping in logicalToPhysical
    this.style.setProperty("--_n-popout-position-x", `${x}px`)
    this.style.setProperty("--_n-popout-position-y", `${y}px`)

    if (middlewareData.hide?.referenceHidden) {
      this.hide()
    }
  }

  /**
   * Toggle the popout open or closed using state.
   * Updating the position to underneath the target button before the popout is opened.
   */
  private toggleOpen = (e: Event) => {
    e.preventDefault()
    if (this.open) {
      this.hide(false)
    } else if (!this.smallViewport) {
      this.updatePosition().then(() => this.show())
    } else {
      this.show()
    }
  }

  private getToggle() {
    const rootNode = this.getRootNode() as Document | ShadowRoot
    const toggle = <HTMLElement>rootNode.querySelector(`[aria-controls='${this.id}']`)

    if (toggle instanceof HTMLSlotElement) {
      return toggle.assignedElements()[0] as HTMLElement
    }

    return toggle
  }

  private getAnchor() {
    const rootNode = this.getRootNode() as Document | ShadowRoot
    const anchor = <HTMLElement>rootNode.querySelector(`#${this.anchor}`)

    if (anchor instanceof HTMLSlotElement) {
      return anchor.assignedElements()[0] as HTMLElement
    }

    return anchor
  }

  /**
   * Update the smallViewport flag to switch between "sheet" and "floating".
   * autoUpdate is needed when a viewport gets larger and the popout is open.
   */
  private handleMediaQueryChange = () => {
    this.smallViewport = mediaQuery.matches

    this.cleanupAutoUpdate?.()

    if (!this.smallViewport && this.open) {
      this.cleanupAutoUpdate = autoUpdate(this.anchorElement, this, this.updatePosition)
      this.scrollBar.unlockScroll()
    } else if (this.open) {
      this.scrollBar.lockScroll()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-popout": Popout
  }
}
