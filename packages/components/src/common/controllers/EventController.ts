import { ReactiveController, ReactiveControllerHost } from "lit"

interface ShadowRootEventMap {
  slotchange: Event
}

export class EventController implements ReactiveController {
  private listeners: Array<() => void> = []

  constructor(host: ReactiveControllerHost) {
    host.addController(this)
  }

  hostDisconnected() {
    this.listeners.forEach(stop => stop())
    this.listeners = []
  }

  listen<K extends keyof WindowEventMap>(
    window: Window,
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void

  listen<K extends keyof DocumentEventMap>(
    document: Document,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void

  listen<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void

  listen<K extends keyof ShadowRootEventMap>(
    element: ShadowRoot,
    type: K,
    listener: (this: ShadowRoot, ev: ShadowRootEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void

  listen<K extends keyof MediaQueryListEventMap>(
    element: MediaQueryList,
    type: K,
    listener: (this: ShadowRoot, ev: MediaQueryListEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void

  listen(
    element: Window | Document | HTMLElement | ShadowRoot | MediaQueryList,
    type: string,
    listener: (ev: any) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    element.addEventListener(type, listener, options)

    const stop = () => element.removeEventListener(type, listener, options)
    this.listeners.push(stop)
  }
}
