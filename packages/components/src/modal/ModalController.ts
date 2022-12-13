/* eslint-disable max-classes-per-file */
import { ReactiveController, ReactiveControllerHost } from "lit"
import { EventController } from "../common/controllers/EventController.js"
import { FocusTrapController } from "../common/controllers/FocusTrapController.js"
import { LightDismissController, LightDismissOptions } from "../common/controllers/LightDismissController.js"
import { ScrollbarController } from "../common/controllers/ScrollbarController.js"

class Stack<T> {
  private items: T[] = []

  get length() {
    return this.items.length
  }

  get top(): T | undefined {
    return this.items[this.length - 1]
  }

  push(item: T) {
    this.items.push(item)
  }

  pop() {
    return this.items.pop()
  }

  remove(item: T) {
    const index = this.items.indexOf(item)

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}

const isButton = (element: Element): element is HTMLButtonElement => element.localName === "button"

type ModalControllerOptions = {
  isOpen: LightDismissOptions["isOpen"]
  onDismiss: LightDismissOptions["onDismiss"]
  close: (returnValue?: string) => void
  backdrop: () => HTMLElement
  dialog: () => HTMLElement
}

export class ModalController implements ReactiveController {
  private static openModals = new Stack<ModalController>()

  private scrollBar: ScrollbarController
  private focusTrap: FocusTrapController
  private lightDismiss: LightDismissController
  private events: EventController
  private options: ModalControllerOptions

  private trigger?: HTMLElement
  private lastButton?: HTMLButtonElement

  constructor(private host: ReactiveControllerHost & HTMLElement, options: ModalControllerOptions) {
    host.addController(this)
    this.options = options

    this.scrollBar = new ScrollbarController(host)
    this.focusTrap = new FocusTrapController(host, options.dialog)
    this.events = new EventController(host)
    this.lightDismiss = new LightDismissController(host, {
      isOpen: options.isOpen,
      isDismissible: node => node !== options.dialog(),
      onDismiss: this.handleLightDismiss,
    })
  }

  hostConnected() {
    // if submit event is not supported, let's do a basic polyfill
    if (!window.SubmitEvent) {
      this.events.listen(this.host, "click", this.trackLastButton, true)
      this.events.listen(this.host, "submit", this.polyfillSubmitter, true)
    }

    this.events.listen(this.host, "transitionend", this.handleTransitionEnd)
    this.events.listen(this.host, "submit", this.handleSubmit)
  }

  hostDisconnected(): void {
    ModalController.openModals.remove(this)
  }

  block() {
    // if there is already a modal open, release its focus trap
    ModalController.openModals.top?.focusTrap.release()

    // add this modal to the stack of open modals
    ModalController.openModals.push(this)

    // hide scrollbar and prevent scroll on body
    this.scrollBar.lockScroll()

    // store the element that was focused prior to modal opening
    this.trigger = document.activeElement as HTMLElement

    // handle initial (auto)focus
    const focusTarget = this.host.querySelector<HTMLElement>("[autofocus]") || this.host
    focusTarget.focus()

    // finally, we should enable the focus trap
    this.focusTrap.trap()
  }

  unblock() {
    // it does not make sense to unblock a modal if it is not the top-most modal
    if (ModalController.openModals.top !== this) {
      return
    }

    ModalController.openModals.pop()

    // ensure modal is scrolled to top ready for re-open
    this.options.backdrop().scrollTop = 0

    // we need to release the focus trap...
    this.focusTrap.release()

    // ...before we can return focus to the trigger
    this.trigger?.focus()
    this.trigger = undefined

    // if there are still modals open, enable the next modal's focus trap
    ModalController.openModals.top?.focusTrap.trap()
  }

  /**
   * capture the last button clicked, so that we can polyfill `submitter` property in submit event
   */
  private trackLastButton = (e: Event) => {
    const target = e.target as HTMLElement

    if (isButton(target)) {
      this.lastButton = target
    }
  }

  private polyfillSubmitter = (e: Event) => {
    // @ts-expect-error submitter is readonly, but this is only called if SubmitEvent is not supported
    e.submitter = this.lastButton
  }

  private handleTransitionEnd = (e: TransitionEvent) => {
    // scrollbar should only be restored when the modal has transitioned,
    // that way we avoid awkward double scrollbars.
    if (!this.options.isOpen() && e.target === this.host) {
      this.scrollBar.unlockScroll()
    }
  }

  private handleLightDismiss = (e: Event) => {
    if (this.host.contains(e.target as Node)) {
      this.options.onDismiss(e)
    }
  }

  private handleSubmit = (e: SubmitEvent) => {
    this.lastButton = undefined

    const target = e.target as HTMLFormElement
    const submitter = e.submitter as HTMLButtonElement

    const isDialogProperty = target.method === "dialog"
    const isDialogAttr = target.getAttribute("method") === "dialog"

    // if they mismatch, it means "dialog" method is not supported,
    // so we should polyfill the fact it does not do a full submit
    if (isDialogAttr && !isDialogProperty) {
      e.preventDefault()
    }

    if (isDialogAttr || isDialogProperty) {
      this.options.close(submitter?.value)
    }
  }
}
