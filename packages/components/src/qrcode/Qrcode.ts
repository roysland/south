import { LitElement, html } from "lit"
import { customElement, property, query } from "lit/decorators.js"
import { styleMap } from "lit/directives/style-map.js"
import QrCreator from "qr-creator"
import { observe } from "../common/decorators/observe.js"

import componentStyle from "../common/styles/Component.css"
import style from "./Qrcode.css"

/**
 * QR Code component is used for providing information or links
 * to users which they can quickly scan with their smartphone.
 *
 * @status ready
 * @category image
 * @displayName QR Code
 */
@customElement("nord-qrcode")
export default class Qrcode extends LitElement {
  static styles = [componentStyle, style]

  @query("canvas", true) private canvas!: HTMLElement
  @query(".computed", true) private computed!: HTMLElement

  /**
   * The value of the QR Code, most commonly an URL.
   */
  @property({ reflect: true }) value = ""

  /**
   * Label used by assistive technology. If unspecified, the value will
   * be used instead.
   */
  @property({ reflect: true }) label = ""

  /**
   * The size of the rendered QR Code in pixels.
   */
  @property({ reflect: true, type: Number }) size = 128

  /**
   * The fill color of the QR Code.
   * Can accept any valid CSS color value, including custom properties.
   */
  @property({ reflect: true }) color = "var(--n-color-text)"

  /**
   * The background color of the QR Code.
   * Can accept any valid CSS color value, including custom properties.
   */
  @property({ reflect: true }) background = "var(--n-color-surface)"

  /**
   * Error correction level makes the QR Code bigger and helps users to
   * scan it without issues. L, M, Q and H values will use 7%, 15%, 25%
   * and 30% of the QR code for error correction respectively.
   */
  @property({ reflect: true }) correction: "L" | "M" | "Q" | "H" = "H"

  firstUpdated() {
    this.generate()
  }

  @observe("correction")
  @observe("color")
  @observe("background")
  @observe("size")
  @observe("value")
  private generate() {
    /**
     * Lit’s built-in hasUpdated property returns true if the component
     * has updated at least once.
     */
    if (!this.hasUpdated) {
      return
    }

    const { backgroundColor, color } = getComputedStyle(this.computed)

    QrCreator.render(
      {
        text: this.value,
        radius: 0,
        ecLevel: this.correction,
        fill: color,
        background: backgroundColor === "transparent" ? null : backgroundColor,
        // Draw the canvas 2x larger to avoid blurring on high DPI displays
        size: this.size * 2,
      },
      this.canvas
    )
  }

  render() {
    return html`
      <div
        class="n-qrcode"
        style=${styleMap({
          "inline-size": `${this.size}px`,
          "block-size": `${this.size}px`,
        })}
      >
        <canvas role="img" aria-label=${this.label.length > 0 ? this.label : this.value}></canvas>
      </div>
      <div
        class="computed"
        hidden
        style=${styleMap({
          "background-color": `${this.background}`,
          color: `${this.color}`,
        })}
      ></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-qrcode": Qrcode
  }
}
