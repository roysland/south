import { nothing, ReactiveController, ReactiveControllerHost, render, RenderOptions } from "lit"

type LightDomOptions = {
  render: () => unknown
  renderOptions?: RenderOptions
  container?: HTMLElement
}

export class LightDomController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement, private options: LightDomOptions) {
    host.addController(this)
  }

  private get container(): HTMLElement {
    return this.options.container || this.host
  }

  hostUpdated() {
    this.render()
  }

  hostDisconnected() {
    render(nothing, this.container, this.options.renderOptions)
  }

  private render() {
    render(this.options.render(), this.container, this.options.renderOptions)
  }
}
