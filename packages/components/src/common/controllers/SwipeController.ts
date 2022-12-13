import { ReactiveController, ReactiveElement } from "lit"
import { EventController } from "./EventController.js"

export type SwipeDetails = {
  initialX: number
  initialY: number
  pageX: number
  pageY: number
  distX: number
  distY: number
}

const preventDefault = (e: Event) => e.preventDefault()

type SetRequired<T, K extends keyof T> = T & { [Property in K]-?: T[K] }
type SwipeControllerOptions = {
  target?: () => HTMLElement
  matchesGesture: (details: SwipeDetails) => boolean
  onSwipeEnd: (details: SwipeDetails) => void
}

export class SwipeController implements ReactiveController {
  private events: EventController
  private hadFirstUpdate = false

  private initialTouchX: number = 0
  private initialTouchY: number = 0
  private options: SetRequired<SwipeControllerOptions, "target">

  constructor(host: ReactiveElement, options: SwipeControllerOptions) {
    host.addController(this)
    this.events = new EventController(host)

    this.options = {
      target: () => host,
      ...options,
    }
  }

  hostUpdated() {
    if (!this.hadFirstUpdate) {
      this.hadFirstUpdate = true

      const target = this.options.target()
      this.events.listen(target, "touchstart", this.handleTouchStart)
      this.events.listen(target, "touchmove", preventDefault)
      this.events.listen(target, "touchend", this.handleTouchEnd)
    }
  }

  hostDisconnected() {
    this.hadFirstUpdate = false
  }

  private handleTouchStart = (event: TouchEvent) => {
    const [{ pageX, pageY }] = event.changedTouches
    this.initialTouchX = pageX
    this.initialTouchY = pageY
  }

  private handleTouchEnd = (event: TouchEvent) => {
    const [{ pageX, pageY }] = event.changedTouches
    const { matchesGesture, onSwipeEnd } = this.options

    const distX = pageX - this.initialTouchX
    const distY = pageY - this.initialTouchY
    const details = { initialX: this.initialTouchX, initialY: this.initialTouchY, pageX, pageY, distX, distY }

    if (matchesGesture(details)) {
      event.preventDefault()
      onSwipeEnd(details)
    }
  }
}

const THRESHOLD = 70

export const isHorizontalSwipe = ({ distX, distY }: SwipeDetails) =>
  Math.abs(distX) >= THRESHOLD && Math.abs(distY) <= THRESHOLD

export const isDownwardsSwipe = ({ distX, distY }: SwipeDetails) =>
  Math.abs(distY) >= THRESHOLD && Math.abs(distX) <= THRESHOLD && distY > 0
