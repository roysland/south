import { ReactiveController, ReactiveControllerHost } from "lit"

export type WritingDirection = "ltr" | "rtl"

export class DirectionController implements ReactiveController {
  // these are all static as we only want a single observer on <html>
  private static hosts = new Set<ReactiveControllerHost>()
  private static observer?: MutationObserver

  // eslint-disable-next-line class-methods-use-this
  get dir(): WritingDirection {
    return (document.documentElement.dir as WritingDirection) || "ltr"
  }

  get isLTR() {
    return this.dir === "ltr"
  }

  get isRTL() {
    return this.dir === "rtl"
  }

  constructor(private host: ReactiveControllerHost) {
    this.host.addController(this)
  }

  hostConnected() {
    if (!DirectionController.observer) {
      DirectionController.observer = new MutationObserver(DirectionController.observe)
      DirectionController.observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] })
    }

    if (!DirectionController.hosts.has(this.host)) {
      DirectionController.hosts.add(this.host)
    }
  }

  hostDisconnected() {
    DirectionController.hosts.delete(this.host)
  }

  private static observe() {
    DirectionController.hosts.forEach(host => host.requestUpdate())
  }
}
