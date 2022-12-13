import { ReactiveController, ReactiveControllerHost } from "lit"
import { EventController } from "./EventController.js"
import { ShortcutController } from "./ShortcutController.js"

export type LightDismissOptions = {
  isOpen: () => boolean
  onDismiss: EventListener
  isDismissible?: (node: EventTarget) => boolean
}

export class LightDismissController implements ReactiveController {
  private shortcut: ShortcutController
  private events: EventController

  constructor(private host: ReactiveControllerHost & Element, private options: LightDismissOptions) {
    host.addController(this)
    this.shortcut = new ShortcutController(host, { Escape: this.handleEsc })
    this.events = new EventController(host)
  }

  hostConnected() {
    this.events.listen(document, "click", this.handleClickOut, true)
  }

  private handleEsc = (e: KeyboardEvent) => {
    if (!this.options.isOpen()) {
      return
    }

    this.options.onDismiss(e)
  }

  private handleClickOut = (e: MouseEvent) => {
    if (!this.options.isOpen()) {
      return
    }

    const predicate: LightDismissOptions["isDismissible"] = this.options.isDismissible ?? (node => node !== this.host)
    const isClickOutside = e.composedPath().every(predicate)

    if (isClickOutside) {
      this.options.onDismiss(e)
    }
  }
}
