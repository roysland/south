import { html, LitElement } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { observe } from "../common/decorators/observe.js"
import { cond } from "../common/directives/cond.js"

import componentStyle from "../common/styles/Component.scss"
import style from "./Icon.scss"

export type IconResolver = (iconName: string) => Promise<string>

// in dev we should just load from node_modules
const loadIcon: IconResolver = (name: string) =>
  import(`@nordhealth/icons/lib/assets/${name}.js`).then(({ default: svg }) => svg)

// in prod we should load from the CDN, as a sensible default
const loadIconCdn: IconResolver = (name: string) =>
  fetch(`https://nordcdn.net/ds/icons/${process.env.ICON_VERSION}/assets/${name}.svg`).then(response => {
    if (!response.ok) {
      throw new TypeError(`NORD: unknown icon '${name}'`)
    }

    return response.text()
  })

/**
 * Icons are used to provide additional meaning or in places where text label doesn’t fit.
 * Icon component allows you to display an icon from the Nordicons library.
 *
 * @status ready
 * @category image
 * @slot - The default slot used for placing a custom SVG icon.
 */
@customElement("kabal-icon")
export default class Icon extends LitElement {
  static styles = [componentStyle, style]

  private static resolver: IconResolver = process.env.NODE_ENV === "development" ? loadIcon : loadIconCdn
  private static registeredIcons = new Map<string, string>()

  /**
   * Register a custom icon resolver, which accepts the icon name as an parameter, and returns an SVG string.
   * Can return a string synchronously, or a promise of a string.
   * By default, will load icons from the Nord CDN.
   * @param resolver The resolver function to register.
   */
  static registerResolver(resolver: IconResolver) {
    Icon.resolver = resolver
  }

  /**
   * Register an individual icon so it can be rendered synchronously, to avoid loading over the network.
   * @param icon An object representing the icon to be registered, where "title" is the icon's name, and "default" is the SVG string.
   * This is intended to be used in cases where you import an icon's entire ES module and register it directly.
   */
  static registerIcon(icon: { title: string; default: string }): void

  /**
   * Register an individual icon so it can be rendered synchronously, to avoid loading over the network.
   * @param name The name of the icon to be registered.
   * @param icon The SVG string for the icon.
   */
  static registerIcon(name: string, icon: string): void

  /**
   * Register an individual icon so it can be rendered synchronously, to avoid loading over the network.
   * @param iconOrName The name of the icon to be registered or an object representing the icon to be registered, where "title" is the icon's name, and "default" is the SVG string.
   * @param icon The SVG string for the icon.
   */
  static registerIcon(iconOrName: string | { title: string; default: string }, icon?: string) {
    let name: string | undefined
    let svg: string | undefined

    if (typeof iconOrName === "string") {
      name = iconOrName
      svg = icon
    } else {
      name = iconOrName.title
      svg = iconOrName.default
    }

    // handle errors
    if (!name) {
      throw new Error("name is required when registering an icon")
    }
    if (!svg) {
      throw new Error("icon must not be empty")
    }

    if (!Icon.registeredIcons.has(name)) {
      Icon.registeredIcons.set(name, svg)
    }
  }

  /**
   * The name of the icon to display, as defined by [nordicons](/nordicons/).
   */
  @property({ reflect: true }) name: string = ""

  /**
   * The size of the icon.
   */
  @property({ reflect: true }) size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl"

  /**
   * The color of the icon.
   * Can accept any valid CSS color value, including custom properties.
   */
  @property({ reflect: true }) color?: string

  /**
   * An accessible label for the icon.
   * If no label is supplied, the icon is hidden from assistive technology.
   */
  @property({ reflect: true }) label?: string

  @state() private svg: string = ""

  render() {
    // if a label is supplied, we give the div a role of img.
    // without this we could not use aria-label, since it is only valid on elements of certain roles.
    // we always hide the inner svg, since the svg does not have any text/title/label itself.
    return html`
      <div
        role=${cond(this.label, "img")}
        style=${cond(this.color, `color:${this.color}`)}
        aria-label=${ifDefined(this.label)}
      >
        <slot aria-hidden="true"></slot>
        <div aria-hidden="true">${unsafeHTML(this.svg)}</div>
      </div>
    `
  }

  @observe("name")
  protected handleNameChange() {
    if (!this.name) {
      this.svg = ""
      return
    }

    if (Icon.registeredIcons.has(this.name)) {
      this.svg = Icon.registeredIcons.get(this.name) as string
      return
    }

    Icon.resolver(this.name)
      .then(svg => {
        this.svg = svg
      })
      .catch(() => {
        this.svg = ""
      })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-icon": Icon
  }
}
