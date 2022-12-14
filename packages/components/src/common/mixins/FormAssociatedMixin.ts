/* eslint-disable max-classes-per-file */
import { html, LitElement, TemplateResult } from "lit"
import { property } from "lit/decorators.js"
import { FormDataController } from "../controllers/FormDataController.js"
import { SlotController } from "../controllers/SlotController.js"
import { NordEvent } from "../events.js"
import { InputMixinInterface } from "./InputMixin.js"
import "../../visually-hidden/VisuallyHidden.js"

type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T
type NativeInputElement = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement

export declare class FormAssociatedMixinInterface {
  label: string
  required: boolean
  hideRequired: boolean
  hint?: string
  hideLabel: boolean
  placeholder?: string
  error?: string

  protected inputId: string
  protected errorId: string
  protected hintId: string
  protected labelSlot: SlotController
  protected hintSlot: SlotController
  protected errorSlot: SlotController
  protected formData: FormDataController

  protected get formValue(): string | undefined
  protected get hasError(): boolean
  protected get hasHint(): boolean

  protected handleChange(e: Event): void
  protected handleInput(e: Event): void
  protected renderLabel(additionalContent?: TemplateResult): TemplateResult
  protected renderError(): TemplateResult
  protected getDescribedBy(): string | undefined
  protected getInvalid(): "true" | undefined
}

export function FormAssociatedMixin<T extends Constructor<InputMixinInterface & LitElement>>(superClass: T) {
  // TODO: would be nice if custom elements analyzer could pick up the slot docs from the mixin

  /**
   * @slot label - Use when a label requires more than plain text.
   * @slot hint - Use when a hint requires more than plain text.
   * @slot error - Optional slot that holds error text for the input.
   */
  class FormAssociatedElement extends superClass {
    protected labelSlot = new SlotController(this, "label")
    protected errorSlot = new SlotController(this, "error")
    protected hintSlot = new SlotController(this, "hint")
    protected formData = new FormDataController(this, { value: () => this.formValue })

    protected get formValue() {
      return this.value
    }

    protected inputId = "input"
    protected errorId = "error"
    protected hintId = "hint"

    /**
     * Label for the input.
     */
    @property() label: string = ""

    /**
     * Optional hint text to be displayed with the input. Alternatively use the hint slot.
     */
    @property() hint?: string

    /**
     * Visually hide the label, but still show it to assistive technologies like screen readers.
     */
    @property({ type: Boolean, attribute: "hide-label" }) hideLabel = false

    /**
     * Placeholder text to display within the input.
     */
    @property() placeholder?: string

    /**
     * Optional error to be shown with the input. Alternatively use the error slot.
     */
    @property() error?: string

    /**
     * Determines whether the input is required or not.
     * An input marked as required will be announced as such to users of assistive technology.
     * When using this property you need to also set “novalidate” attribute on a form element to prevent browser from displaying its own validation errors.
     */
    @property({ type: Boolean }) required = false

    /**
     * Visually hide the required indicator, but still show
     * required attribute to assistive technologies like screen readers.
     */
    @property({ type: Boolean, attribute: "hide-required" }) hideRequired = false

    protected handleInput(e: Event) {
      e.stopPropagation()
      const target = e.target as NativeInputElement
      this.value = target.value

      /**
       * Fired as the user types into the input.
       */
      this.dispatchEvent(new NordEvent("input"))
    }

    protected handleChange(e: Event) {
      e.stopPropagation()

      /**
       * Fired whenever the input's value is changed via user interaction.
       */
      this.dispatchEvent(new NordEvent("change"))
    }

    protected renderLabel(additionalContent?: TemplateResult) {
      const label = html`
        <label for=${this.inputId}>
          <slot name="label">${this.label}</slot
          ><span ?hidden=${!this.required || this.hideRequired} aria-hidden="true" class="n-required">*</span>
          ${additionalContent}
        </label>

        <div class="n-caption n-hint" id=${this.hintId} ?hidden=${!this.hasHint}>
          <slot name="hint">${this.hint}</slot>
        </div>
      `

      return this.hideLabel
        ? html`<kabal-visually-hidden>${label}</kabal-visually-hidden>`
        : html`<div class="n-label-container">${label}</div>`
    }

    protected renderError() {
      return html`
        <div class="n-caption n-error" id=${this.errorId} role="alert" ?hidden=${!this.hasError}>
          <slot name="error">${this.error}</slot>
        </div>
      `
    }

    protected getDescribedBy() {
      const { hasHint, hasError } = this

      if (hasHint && hasError) {
        return `${this.hintId} ${this.errorId}`
      }
      if (hasHint) {
        return this.hintId
      }
      if (hasError) {
        return this.errorId
      }

      return undefined
    }

    protected getInvalid() {
      return this.hasError ? "true" : undefined
    }

    protected get hasHint() {
      return Boolean(this.hint) || this.hintSlot.hasContent
    }

    protected get hasError() {
      return Boolean(this.error) || this.errorSlot.hasContent
    }
  }

  return FormAssociatedElement as unknown as Constructor<FormAssociatedMixinInterface> & T
}
