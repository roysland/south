import { ReactiveController, ReactiveControllerHost } from "lit"
import { EventController } from "./EventController.js"

export class SlotController implements ReactiveController {
  private events: EventController
  private selector: string

  constructor(protected host: ReactiveControllerHost & HTMLElement, public slotName: string = "") {
    host.addController(this)
    this.events = new EventController(host)
    this.selector = slotName ? `:scope > [slot="${slotName}"]` : `:scope > :not([slot])`
  }

  hostConnected() {
    if (this.host.shadowRoot) {
      this.events.listen(this.host.shadowRoot, "slotchange", this.handleSlotChange)
    }
  }

  get hasContent() {
    return this.content != null
  }

  get isEmpty() {
    return !this.hasContent
  }

  get content() {
    return this.host.querySelector(this.selector)
  }

  get assigned() {
    return Array.from(this.host.querySelectorAll(this.selector))
  }

  private handleSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement

    if (slot.name === this.slotName) {
      this.onChange(e)
    }
  }

  protected onChange(_e: Event) {
    this.host.requestUpdate()
  }
}
