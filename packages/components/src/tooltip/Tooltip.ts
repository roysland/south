import { LitElement, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { computePosition, flip, shift, offset } from "@floating-ui/dom"

import * as attr from "../common/attribute.js"
import type { FocusableMixinInterface } from "../common/mixins/FocusableMixin.js"
import { SlotController } from "../common/controllers/SlotController.js"
import componentStyle from "../common/styles/Component.scss"
import style from "./Tooltip.scss"
import { EventController } from "../common/controllers/EventController.js"
import { States, fsm } from "../common/fsm.js"
import { logicalToPhysical } from "../common/positioning.js"
import { observe } from "../common/decorators/observe.js"

// @ts-expect-error we're being naughty and accessing a protected field!
// however this means we always get the correct types,
// and it will ensure this file is not forgotten about if focusable mixin ever changes
type FocusableElement = HTMLElement & Pick<FocusableMixinInterface, "focusableRef">

function isElement(el: Node): el is Element {
  return el.nodeType === Node.ELEMENT_NODE
}

function referencesTooltip(node: Node, tooltip: Tooltip) {
  return Boolean(tooltip.id) && isElement(node) && node.getAttribute("aria-describedby") === tooltip.id
}

function getFocusable(el?: FocusableElement): HTMLElement | undefined {
  const focusable = el?.focusableRef?.value as HTMLElement | FocusableElement | undefined

  if (focusable && "focusableRef" in focusable) {
    return getFocusable(focusable)
  }

  return focusable
}

const { transition } = fsm({
  hidden: {
    show: "waiting",
  },
  visible: {
    hide: "hidden",
    reposition: "positioning",
    show: "positioning",
  },
  waiting: {
    timeout: "positioning",
    hide: "hidden",
  },
  positioning: {
    positioned: "visible",
    hide: "hidden",
  },
})

type TooltipStates = States<typeof transition>

/**
 * Tooltips are floating containers for displaying additional information
 * for the currently focused element. A tooltip can be useful when you want
 * to e.g. give a hint about an existing Command Menu shortcut.
 *
 * @status ready
 * @category overlay
 * @slot - The tooltip content
 * @slot shortcut - Optional slot that holds shortcut keys to access the subject
 * @cssprop [--n-tooltip-max-size=50ch] - Controls the maximum inline size, or width, of the tooltip.
 */
@customElement("kabal-tooltip")
export default class Tooltip extends LitElement {
  static styles = [componentStyle, style]

  // tracks the last tooltip opened, so we can enforce only one is ever open at a time
  private static lastOpened?: Tooltip

  private shortcutSlot = new SlotController(this, "shortcut")
  private events = new EventController(this)

  // The current element which revealed the tooltip shown
  private currentElement?: FocusableElement
  private timeoutId?: ReturnType<typeof setTimeout>

  /**
   * the proxy element is for cases where the targetElement is a web component,
   * and the WC has a focusable child in its shadow root e.g. a button component.
   * in this case, when the tooltip is shown, we inject the proxy into targetElement's shadow root
   * and wire up aria-describedby from the focusable element to the proxy.
   * when the tooltip is hidden, we remove the proxy and remove the aria-describedby relationship.
   */
  private proxy = document.createElement("span")

  /**
   * The current state of the tooltip, dependent on the state machine
   */
  @state() private state: TooltipStates = "hidden"

  // The current coordinates for the tooltip
  private coords: [number, number] = [0, 0]

  /**
   * Control the position of the tooltip component.
   * When set to "none", the tooltip will be shown above
   * but accommodate for browser boundaries.
   */
  @property({ reflect: true }) position: "block-end" | "block-start" | "inline-start" | "inline-end" = "block-start"

  /**
   * The tooltip role, set on the component by default.
   */
  @property({ reflect: true }) role = "tooltip"

  /**
   * The id for the active element to reference via aria-describedby.
   */
  @property({ reflect: true }) id: string = ""

  /**
   * The delay in milliseconds before the tooltip is opened.
   */
  @property({ reflect: true, type: Number }) delay: number = 500

  /**
   * Apply all event listeners
   */
  connectedCallback() {
    super.connectedCallback()

    const rootNode = this.getRootNode() as Document

    this.events.listen(rootNode, "keydown", this.hideOnEscape)

    // we treat mouseover and focusin the same, since they both show tooltip
    this.events.listen(rootNode, "mouseover", this.handleShow)
    this.events.listen(rootNode, "focusin", this.handleShow)

    // we treat focusout, mouseout, click the same, since they all hide tooltip
    this.events.listen(rootNode, "mouseout", this.handleHide)
    this.events.listen(rootNode, "focusout", this.handleHide)
    // we use event capture here to handle cases where e.g. a close button causes its ancestor to be removed from the DOM.
    // in this case the click event will never bubble up to the rootNode, so we never receive it, and the tooltip can remain open
    // by capturing, we get this event first, and can close the tooltip eagerly
    this.events.listen(rootNode, "click", this.handleHide, { capture: true })

    this.events.listen(window, "resize", this.reposition, { passive: true })
    this.events.listen(window, "scroll", this.reposition, { passive: true })
  }

  render() {
    return html`
      <div class="n-tooltip">
        <slot></slot>
        <div class="n-tooltip-shortcut" ?hidden=${this.shortcutSlot.isEmpty}>
          <slot class="n-tooltip-key" name="shortcut"></slot>
        </div>
      </div>
    `
  }

  @observe("id")
  protected handleIdChange() {
    if (!this.id) {
      // eslint-disable-next-line no-console
      console.warn("NORD: The tooltip requires an id attribute and value")
    }
  }

  @observe("state")
  private handleStateChange(prevState: TooltipStates) {
    switch (this.state) {
      case "hidden": {
        if (prevState === "waiting" && this.timeoutId) {
          clearTimeout(this.timeoutId)
        }

        this.removeDescribedBy()
        this.currentElement = undefined
        this.style.visibility = "hidden"
        this.style.opacity = "0"
        break
      }

      case "visible": {
        this.timeoutId = undefined
        Tooltip.lastOpened = this
        this.addDescribedBy()

        const [x, y] = this.coords

        // use physical properties here since floating-ui
        // works exclusively in physical dimensions
        // we do all the mapping in logicalToPhysical
        this.style.left = `${x}px`
        this.style.top = `${y}px`
        this.style.visibility = "visible"
        this.style.opacity = "1"
        break
      }

      case "waiting": {
        this.timeoutId = setTimeout(() => {
          this.state = transition(this.state, "timeout")
        }, this.delay)
        break
      }

      case "positioning": {
        if (Tooltip.lastOpened !== this) {
          Tooltip.lastOpened?.hideTooltip()
        }

        if (this.currentElement) {
          this.updatePosition(this.currentElement)
        }
        break
      }
    }
  }

  /**
   * Setting and updating the position of the tooltip
   */
  private updatePosition = (currentElement: HTMLElement) =>
    computePosition(currentElement, this, {
      strategy: "fixed",
      placement: logicalToPhysical(this.position),
      middleware: [
        offset(8),
        flip(),
        shift({
          padding: 8,
        }),
      ],
    }).then(({ x, y }) => {
      this.coords = [x, y]
      this.state = transition(this.state, "positioned")
    })

  private hideTooltip = () => {
    this.state = transition(this.state, "hide")
  }

  private reposition = () => {
    this.state = transition(this.state, "reposition")
  }

  private handleShow = (e: Event) => {
    const target = e.target as FocusableElement

    if (referencesTooltip(target, this)) {
      this.currentElement = target
      this.state = transition(this.state, "show")
    }
  }

  private handleHide = (e: Event) => {
    if (e.target === this.currentElement) {
      this.hideTooltip()
    }
  }

  private hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.hideTooltip()
    }
  }

  private addDescribedBy = () => {
    const focusable = getFocusable(this.currentElement)

    if (focusable) {
      this.proxy.hidden = true
      this.proxy.id = this.id
      this.proxy.textContent = this.textContent

      focusable.insertAdjacentElement("afterend", this.proxy)
      attr.add(focusable, "aria-describedby", this.id)
    }
  }

  private removeDescribedBy = () => {
    const focusable = getFocusable(this.currentElement)

    if (focusable) {
      this.proxy.remove()
      attr.remove(focusable, "aria-describedby", this.id)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-tooltip": Tooltip
  }
}
