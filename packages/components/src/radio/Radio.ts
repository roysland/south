import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ref } from "lit/directives/ref.js"
import { LightDomController } from "../common/controllers/LightDomController.js"
import { LightSlotController } from "../common/controllers/LightSlotController.js"
import { observe } from "../common/decorators/observe.js"
import { cond } from "../common/directives/cond.js"
import { wrapIf } from "../common/directives/wrapIf.js"

import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import style from "./Radio.scss"

let id = 0
const createId = (suffix: string) => `kabal-radio-${suffix}-${id++}`

function isLabel(element: Element): element is HTMLLabelElement {
  return element.localName === "label"
}

/**
 * Radio buttons are graphical user interface elements that allow user to choose only one option from
 * a predefined set of mutually exclusive options.
 *
 * @status ready
 * @category form
 * @slot label - Use when a label requires more than plain text.
 * @slot hint - Optional slot that holds hint text for the input.
 * @slot error - Optional slot that holds error text for the input.
 */
@customElement("kabal-radio")
export default class Radio extends FormAssociatedMixin(InputMixin(FocusableMixin(LitElement))) {
  static styles = [componentStyle, formFieldStyle, style]

  protected override inputId = createId("input")
  protected override hintId = createId("hint")
  protected override errorId = createId("error")

  /**
   * For accessibility reasons, we render some parts of the component to the light DOM.
   */
  protected override hintSlot = new LightSlotController(this, {
    slotName: "hint",
    render: () => (this.hint ? html`<div slot="hint-internal" id=${this.hintId}>${this.hint}</div>` : nothing),
    syncLightDom: element => {
      element.id = this.hintId
    },
  })

  protected override labelSlot = new LightSlotController(this, {
    slotName: "label",
    render: () => (this.label ? html`<label slot="label-internal" for=${this.inputId}>${this.label}</label>` : nothing),
    syncLightDom: element => {
      if (!isLabel(element)) {
        // eslint-disable-next-line no-console
        console.warn(`NORD: Only <label> elements should be placed in radio's "label" slot`)
      } else {
        element.htmlFor = this.inputId
      }
    },
  })

  protected override errorSlot = new LightSlotController(this, {
    slotName: "error",
    render: () => (this.error ? html`<div slot="error-internal" id=${this.errorId}>${this.error}</div>` : nothing),
    syncLightDom: element => {
      element.id = this.hintId
    },
  })

  protected inputSlot = new LightDomController(this, {
    render: () =>
      html`
        <input
          slot="input"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          ${ref(this.focusableRef)}
          class="n-input"
          id=${this.inputId}
          type="radio"
          name=${cond(this.name)}
          .value=${cond(this.value)}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-describedby=${cond(this.getDescribedBy())}
          aria-invalid=${cond(this.getInvalid())}
          form=${cond(this.getAttribute("form") || undefined)}
        />
      `,
  })

  // eslint-disable-next-line class-methods-use-this
  protected override get formValue() {
    // opt out of formdata event, since radio button is in light dom
    return undefined
  }

  /**
   * Controls whether the checkbox is checked or not.
   */
  @property({ type: Boolean, reflect: true }) checked: boolean = false

  render() {
    return html`
      <div class="n-flex">
        <div class="n-input-container" @change=${this.handleChange}>
          <slot name="input"></slot>
          ${this.checked ? html`<div class="n-dot"></div>` : nothing}
        </div>
        <div class="n-expand">
          <div class="n-label-container">
            ${wrapIf(
              this.hideLabel,
              () => html`
                <slot name="label"></slot>
                <slot name="label-internal"></slot>
              `,
              content => html`<kabal-visually-hidden>${content}</kabal-visually-hidden>`
            )}
            <div class="n-caption n-hint" ?hidden=${!this.hasHint}>
              <slot name="hint"></slot>
              <slot name="hint-internal"></slot>
            </div>
          </div>
          <div class="n-caption n-error" role="alert" ?hidden=${!this.hasError}>
            <slot name="error"></slot>
            <slot name="error-internal"></slot>
          </div>
        </div>
      </div>
    `
  }

  @observe("checked")
  protected handleCheckedChange(previousChecked: boolean) {
    // if this component was previous unchecked but is now checked,
    // then we need to uncheck any radios in the same group
    if (!previousChecked && this.checked) {
      this.uncheckSiblings()
    }
  }

  private uncheckSiblings() {
    const root = this.getRootNode() as Document | ShadowRoot

    root.querySelectorAll<Radio>(`kabal-radio[name="${this.name}"]`).forEach(radio => {
      if (radio !== this) {
        radio.checked = false
      }
    })
  }

  protected handleChange(e: Event): void {
    e.stopPropagation()
    const target = e.target as HTMLInputElement

    this.checked = target.checked
    super.handleChange(e)
  }

  private handleBlur = (e: Event) => {
    e.stopPropagation()
    this.dispatchEvent(new Event("blur", { bubbles: false, cancelable: true }))
  }

  private handleFocus = (e: Event) => {
    e.stopPropagation()
    this.dispatchEvent(new Event("focus", { bubbles: false, cancelable: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kabal-radio": Radio
  }
}
