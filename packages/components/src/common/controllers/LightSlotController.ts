import { nothing, ReactiveControllerHost } from "lit"
import { LightDomController } from "./LightDomController.js"
import { SlotController } from "./SlotController.js"

type LightSlotOptions = {
  slotName: string
  render: () => unknown
  syncLightDom: (element: Element) => void
}

/**
 * Handles cases where a component needs to render to light DOM,
 * and potentially sync component properties to user-supplied content.
 */
export class LightSlotController extends SlotController {
  private renderHook: Comment
  private lightDom: LightDomController

  constructor(host: ReactiveControllerHost & HTMLElement, private options: LightSlotOptions) {
    super(host, options.slotName)

    // we need a node to hook onto for rendering
    // without this, multiple controllers rendering to the light DOM
    // will overwrite each others' content
    this.renderHook = document.createComment(this.slotName)

    this.lightDom = new LightDomController(host, {
      render: () => (this.hasContent ? nothing : this.options.render()),
      renderOptions: { renderBefore: this.renderHook },
    })
  }

  hostConnected() {
    super.hostConnected()
    this.host.appendChild(this.renderHook)
    this.syncLightDom()
  }

  hostDisconnected() {
    this.renderHook.remove()
  }

  protected override onChange = () => {
    this.syncLightDom()
  }

  private syncLightDom() {
    const node = this.content

    if (node) {
      this.options.syncLightDom(node)
    }
  }
}
