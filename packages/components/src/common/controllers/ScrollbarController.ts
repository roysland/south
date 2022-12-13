import { ReactiveController, ReactiveControllerHost } from "lit"

/**
 * We can have any number of components open at a time, all of which lock scroll.
 * Consider multiple modals being open, plus some popouts, etc.
 *
 * So we need some bookkeeping to know when to unlock scroll...
 *
 * But we can't simply keep a count of how many components are open,
 * since a misbehaving component may call lockScroll() multiple times.
 *
 * Nor can we rely on the first component to call lockScroll() to be the last to unlockScroll(),
 * since we cannot guarantee order of operations.
 *
 * Therefore, we track instances of ScrollbarController in a Set,
 * and only unlock scroll when the set is empty.
 *
 * We also need to be careful to restore any styles that were there
 * before we locked scroll.
 */
export class ScrollbarController implements ReactiveController {
  private static locks = new Set<ScrollbarController>()
  private static resets: Array<() => void> = []

  constructor(host: ReactiveControllerHost) {
    host.addController(this)
  }

  hostDisconnected() {
    this.unlockScroll()
  }

  lockScroll() {
    if (ScrollbarController.locks.size === 0) {
      const documentWidth = document.documentElement.clientWidth
      const width = Math.abs(window.innerWidth - documentWidth)

      const computedStyle = getComputedStyle(document.body)
      const paddingRight = parseInt(computedStyle.paddingRight, 10) || 0

      // hiding the scrollbar slightly increases the width of the inner viewport.
      // this is fine for the modal, since it is accounted for there. but it causes layout shift for any other fixed position components/elements.
      // so we define a custom property here for the gutter value, since it can be inherited/used by any other component that has a fixed position e.g. toast-group.
      ScrollbarController.setStyle("--n-scrollbar-gutter", `${width + paddingRight}px`)
      ScrollbarController.setStyle("overflow", "hidden")
      // use physical padding property rather than the logical equivalent, since the scrollbar is on always right side of the viewport, even in RTL.
      ScrollbarController.setStyle("padding-right", `var(--n-scrollbar-gutter)`)
    }

    ScrollbarController.locks.add(this)
  }

  unlockScroll() {
    ScrollbarController.locks.delete(this)

    if (ScrollbarController.locks.size === 0) {
      ScrollbarController.resets.forEach(reset => reset())
      ScrollbarController.resets = []
    }
  }

  private static setStyle(property: string, value: string) {
    const { style } = document.body

    const previous = style.getPropertyValue(property)
    style.setProperty(property, value)

    ScrollbarController.resets.push(() => style.setProperty(property, previous))
  }
}
