/* eslint-disable max-classes-per-file */
import { LitElement } from "lit"
import { property } from "lit/decorators.js"
import { Alignment } from "@floating-ui/dom"
import { LogicalSide } from "../positioning.js"

type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T

export declare class FloatingMixinInterface {
  open: boolean
  align: Alignment
  position: LogicalSide
}

export function FloatingMixin<T extends Constructor<LitElement>>(
  superClass: T
): Constructor<FloatingMixinInterface> & T {
  class FloatingElement extends superClass {
    /**
     * Controls whether the component is open or not.
     */
    @property({ type: Boolean, reflect: true }) open = false

    /**
     * Set the alignment in relation to the toggle (or anchor) depending on the position.
     * `start` will align it to the left of the toggle (or anchor).
     * `end` will align it to the right of the toggle (or anchor).
     * Setting the `position` to `inline-start` or `inline-end` will switch
     * `start` and `end` to the top and bottom respectively.
     */
    @property({ reflect: true }) align: "start" | "end" = "start"

    /**
     * Set the position in relation to the toggle (or anchor).
     * Options follow logical properties.
     * `block-start` and `block-end` referring to top and bottom respectively,
     * `inline-start` and `inline-end` referring to left and right respectively.
     */
    @property({ reflect: true }) position: "block-end" | "block-start" | "inline-start" | "inline-end" = "block-end"
  }

  return FloatingElement
}
