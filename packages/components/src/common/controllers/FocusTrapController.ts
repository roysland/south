import { ReactiveController, ReactiveControllerHost } from "lit"

export class FocusTrapController implements ReactiveController {
  private lastScrollY = 0
  private lastFocused?: HTMLElement

  constructor(host: ReactiveControllerHost & HTMLElement, private boundary: () => HTMLElement = () => host) {
    host.addController(this)
  }

  hostDisconnected() {
    this.release()
  }

  trap() {
    this.lastScrollY = window.scrollY
    this.boundary().addEventListener("focusout", this.handleFocusOut)
    window.addEventListener("scroll", this.restoreScroll)
    window.addEventListener("focusin", this.handleFocusIn)
  }

  release() {
    this.lastScrollY = 0
    this.lastFocused = undefined

    this.boundary().removeEventListener("focusout", this.handleFocusOut)
    window.removeEventListener("scroll", this.restoreScroll)
    window.removeEventListener("focusin", this.handleFocusIn)
  }

  private handleFocusOut = (e: FocusEvent) => {
    this.lastFocused = e.target as HTMLElement

    if (e.relatedTarget === this.boundary()) {
      this.recaptureFocus()
    }
  }

  private handleFocusIn = (e: FocusEvent) => {
    const isOutside = !e.composedPath().includes(this.boundary())

    if (isOutside) {
      this.recaptureFocus()
    }
  }

  private recaptureFocus() {
    this.lastFocused?.focus({ preventScroll: true })
  }

  private restoreScroll = () => {
    window.scrollTo(window.scrollX, this.lastScrollY)
  }
}
