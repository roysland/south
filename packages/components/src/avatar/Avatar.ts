import { LitElement, html, nothing } from "lit"
import { customElement, property, state } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./Avatar.scss"
import { fsm, States } from "../common/fsm.js"
import { observe } from "../common/decorators/observe.js"
import "../visually-hidden/VisuallyHidden.js"

const { transition } = fsm({
  initial: {
    "src-set": "loading",
  },
  loading: {
    load: "loaded",
    error: "initial",
    "src-clear": "initial",
  },
  loaded: {
    "src-set": "loading",
    "src-clear": "initial",
  },
})

/**
 * Avatar is used for showing a thumbnail representation of a user or entity.
 * Default avatar illustration is displayed when no src is specified.
 *
 * @status ready
 * @category image
 *
 * @cssprop [--n-avatar-color=var(--n-color-status-highlight)] - Controls the color of the avatar fallback, using [color tokens](/tokens/#color).
 * @cssprop [--n-avatar-size=var(--n-size-icon-l)] - Controls the size of the avatar, using [icon sizing tokens](/tokens/#size).
 */

@customElement("kabal-avatar")
export default class Avatar extends LitElement {
  static styles = [componentStyle, style]

  @state() private state: States<typeof transition> = "initial"

  /**
   * The size of the avatar.
   */
  @property({ reflect: true }) size: "s" | "m" | "l" | "xl" | "xxl" = "m"

  /**
   * The URL of the avatar image uploaded by the user.
   */
  @property({ reflect: true }) src?: string

  /**
   * The name of the person.
   */
  @property() name: string = ""

  /**
   * The style variant of the avatar.
   */
  @property({ reflect: true }) variant: "default" | "square" = "default"

  render() {
    return html`
      <div class="n-avatar">
        ${this.state !== "initial" ? this.renderImage() : nothing}
        ${this.state !== "loaded" ? this.renderFallback() : nothing}
      </div>
    `
  }

  @observe("src")
  protected handleSrcChange() {
    const event = this.src ? "src-set" : "src-clear"
    this.state = transition(this.state, event)
  }

  protected renderImage() {
    return this.src
      ? html`
          <slot hidden></slot>
          <img
            class="n-${this.state}"
            src=${this.src}
            @load=${this.handleLoad}
            @error=${this.handleError}
            alt=${this.name || ""}
          />
        `
      : nothing
  }

  protected renderFallback() {
    return html`
      <kabal-visually-hidden>${this.name}</kabal-visually-hidden>
      <div class="n-avatar-inner" aria-hidden="true">
        <slot></slot>
      </div>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
        <rect fill="var(--_n-avatar-color)" height="27" rx="12" width="27" x="0" y="0"></rect>
        <g fill="#fff" opacity=".5">
          <circle cx="13.5" cy="30" r="13"></circle>
          <circle cx="13.5" cy="11" r="5"></circle>
        </g>
      </svg>
    `
  }

  private handleLoad() {
    this.state = transition(this.state, "load")
  }

  private handleError() {
    this.state = transition(this.state, "error")
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-avatar": Avatar
  }
}
