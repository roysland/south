import { LitElement, html, nothing } from "lit"
import { customElement, property, query } from "lit/decorators.js"
import { ref } from "lit/directives/ref.js"
import { ifDefined } from "lit/directives/if-defined.js"
import * as calendarIcon from "@nordhealth/icons/lib/assets/interface-calendar.js"
import * as closeIcon from "@nordhealth/icons/lib/assets/interface-close-small.js"

import { FocusableMixin } from "../common/mixins/FocusableMixin.js"
import { FormAssociatedMixin } from "../common/mixins/FormAssociatedMixin.js"
import { InputMixin } from "../common/mixins/InputMixin.js"

import { createDate, DaysOfWeek, parseISODate, printISODate } from "../common/dates.js"
import { NordEvent } from "../common/events.js"
import { isDownwardsSwipe, SwipeController } from "../common/controllers/SwipeController.js"
import { LocalizeController } from "../localization/LocalizeController.js"

import type Button from "../button/Button.js"
import type Popout from "../popout/Popout.js"
import Icon from "../icon/Icon.js"
import "../input/Input.js"
import "../button/Button.js"
import "../visually-hidden/VisuallyHidden.js"
import "../popout/Popout.js"
import "../stack/Stack.js"
import "../calendar/Calendar.js"

import { DateSelectEvent } from "../calendar/DateSelectEvent.js"
import type Calendar from "../calendar/Calendar.js"
import type { DatePredicate } from "../calendar/Calendar.js"

import componentStyle from "../common/styles/Component.scss"
import formFieldStyle from "../common/styles/FormField.scss"
import textFieldStyle from "../common/styles/TextField.scss"
import style from "./DatePicker.scss"

import { DateAdapter, isoAdapter } from "./date-adapter.js"
import { cond } from "../common/directives/cond.js"
import { ReadonlyMixin } from "../common/mixins/ReadonlyMixin.js"
import { SizeMixin } from "../common/mixins/SizeMixin.js"

Icon.registerIcon(calendarIcon)
Icon.registerIcon(closeIcon)

const isDateDisabled = () => false
const isDateHighlighted = () => false

/**
 *
 * Date Picker allows user to enter a date either through text input,
 * or by choosing a date from the calendar. Please note that the date
 * must be passed in ISO-8601 format: YYYY-MM-DD.
 *
 * @status ready
 * @category form
 */
@customElement("nord-date-picker")
export default class DatePicker extends SizeMixin(
  FormAssociatedMixin(ReadonlyMixin(InputMixin(FocusableMixin(LitElement))))
) {
  static styles = [componentStyle, formFieldStyle, textFieldStyle, style]

  @query(`.n-date-picker-toggle`, true) private toggleButton!: Button
  @query(`.n-date-picker-close-button`, true) private closeButton!: HTMLButtonElement
  @query(`nord-calendar`, true) private calendar!: Calendar
  @query(`[role="dialog"]`, true) private popout!: Popout

  private swipe = new SwipeController(this, {
    target: () => this.popout,
    matchesGesture: isDownwardsSwipe,
    onSwipeEnd: () => this.hide(),
  })

  private localize = new LocalizeController<"nord-date-picker">(this, {
    onLangChange: () => this.createDateFormatters(),
  })

  /**
   * Whilst dateAdapter is used for handling the formatting/parsing dates in the input,
   * these are used to format dates exclusively for the benefit of screen readers.
   *
   * We prefer DateTimeFormat over date.toLocaleDateString, as the former has
   * better performance when formatting large number of dates. See:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#Performance
   */
  private dateFormatLong!: Intl.DateTimeFormat

  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  @property() value: string = ""

  get valueAsDate(): Date | undefined {
    return parseISODate(this.value)
  }

  /**
   * Get/set the value of the picker as a Date object.
   */
  set valueAsDate(date: Date | undefined) {
    this.value = date ? printISODate(date) : ""
  }

  get valueAsNumber(): number {
    return this.valueAsDate?.getTime() ?? NaN
  }

  /**
   * Get/set the value of the picker as the number of milliseconds elapsed since the UNIX epoch.
   */
  set valueAsNumber(date: number) {
    this.value = date ? printISODate(new Date(date)) : ""
  }

  /**
   * Controls whether date picker dialog is open or not.
   */
  @property({ type: Boolean, reflect: true }) open = false

  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  @property() min: string = ""

  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  @property() max: string = ""

  /**
   * This is deprecated, the popout will now adjust automatically based on available space.
   * Forces the opening direction of the calendar modal to be always left or right.
   * @deprecated
   */
  @property() direction: "left" | "right" = "right"

  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  @property({ attribute: "first-day-of-week", type: Number }) firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday

  /**
   * Date adapter, for custom parsing/formatting.
   * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
   * and a `format` function which accepts a `Date` and returns a `string`.
   * Default is IS0-8601 parsing and formatting.
   */
  @property({ attribute: false }) dateAdapter: DateAdapter = isoAdapter

  /**
   * Controls which days are disabled and therefore disallowed.
   * For example, this can be used to disallow selection of weekends.
   */
  @property({ attribute: false }) isDateDisabled: DatePredicate = isDateDisabled

  /**
   * Controls which days are highlighted with a small indicator.
   * Returning `false` will not show an indicator.
   * Returning `true` will show the indicator, but without an accessible label. Therefore
   * Returning a string will show the indicator, and use the string as accessible label.
   * It is recommended to return a string rather than `true` whenever possible.
   */
  @property({ attribute: false }) isDateHighlighted: (date: Date) => string | boolean = isDateHighlighted

  /**
   * Controls whether the date picker expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  render() {
    const { valueAsDate } = this
    const formattedDate = valueAsDate ? this.dateAdapter.format(valueAsDate) : ""

    return html`
      <nord-input
        class="n-date-picker-input"
        value=${formattedDate}
        label=${ifDefined(this.label)}
        hint=${ifDefined(this.hint)}
        error=${ifDefined(this.error)}
        placeholder=${ifDefined(this.placeholder)}
        id=${this.inputId}
        size=${this.size}
        ?expand=${this.expand}
        ?disabled=${this.disabled}
        ?required=${this.required}
        ?readonly=${this.readonly}
        ?hide-label=${this.hideLabel}
        disallow-pattern="[^0-9./-]"
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @input=${this.handleInputChange}
        ${ref(this.focusableRef)}
        aria-invalid=${cond(this.error, "true")}
        aria-describedby=${ifDefined(this.getDescribedBy())}
      >
        ${!this.hintSlot.isEmpty ? html`<slot name="hint" slot="hint"></slot>` : nothing}
        ${!this.labelSlot.isEmpty ? html`<slot name="label" slot="label"></slot>` : nothing}
        <nord-button
          size=${this.size}
          ?disabled=${this.disabled || this.readonly}
          slot="end"
          class="n-date-picker-toggle"
          aria-controls="popout"
          type="button"
        >
          <nord-icon name="interface-calendar"></nord-icon>
          <nord-visually-hidden>
            ${this.localize.term("buttonLabel")}
            ${valueAsDate
              ? html`
                  <span>
                    , ${this.localize.term("selectedDateMessage")} ${this.dateFormatLong.format(valueAsDate)}
                  </span>
                `
              : nothing}
          </nord-visually-hidden>
        </nord-button>
      </nord-input>
      <nord-popout
        id="popout"
        anchor=${this.inputId}
        align="end"
        position="block-end"
        role="dialog"
        aria-modal="true"
        ?open=${this.open}
        @open=${this.handleOpen}
        @close=${this.handleClose}
        aria-labelledby="header"
      >
        <div aria-hidden="true" tabindex="0" @focus=${this.focusLast}></div>

        <nord-stack class="n-date-picker-header" direction="horizontal" justify-content="space-between">
          <div class="n-date-picker-heading" id="header">${this.localize.term("modalHeading")}</div>
          <nord-button
            class="n-date-picker-close-button"
            type="button"
            size="s"
            variant="plain"
            @click=${this.handleClose}
          >
            <nord-visually-hidden>${this.localize.term("closeLabel")}</nord-visually-hidden>
            <nord-icon name="interface-close-small"></nord-icon>
          </nord-button>
        </nord-stack>

        <nord-calendar
          class="n-date-picker-calendar"
          expand
          value=${this.value}
          min=${this.min}
          max=${this.max}
          .firstDayOfWeek=${this.firstDayOfWeek}
          .isDateDisabled=${this.isDateDisabled}
          .isDateHighlighted=${this.isDateHighlighted}
          @change=${this.handleDaySelect}
        ></nord-calendar>

        <div aria-hidden="true" tabindex="0" @focus=${this.focusFirst}></div>
      </nord-popout>
    `
  }

  private createDateFormatters() {
    this.dateFormatLong = new Intl.DateTimeFormat(this.localize.resolvedLang, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  private focusFirst() {
    this.closeButton.focus()
  }

  private focusLast() {
    this.calendar.focus({ target: "day" })
  }

  private handleDaySelect = (e: DateSelectEvent) => {
    e.stopPropagation()
    this.setValue(e.date)
    this.hide()
  }

  private handleOpen() {
    this.open = true
    this.calendar.focus({ target: "month" })
  }

  private handleClose() {
    this.open = false
  }

  private handleBlur = (event: Event) => {
    event.stopPropagation()
    this.dispatchEvent(new NordEvent("blur"))
  }

  private handleFocus = (event: Event) => {
    event.stopPropagation()
    this.dispatchEvent(new NordEvent("focus"))
  }

  private handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement

    const parsed = this.dateAdapter.parse(target.value, createDate)
    if (parsed || target.value === "") {
      this.setValue(parsed)
    }
  }

  private setValue(date?: Date) {
    this.value = date ? printISODate(date) : ""
    this.dispatchEvent(new NordEvent("change"))
  }

  /**
   * Hide the date picker programmatically.
   * @param moveFocusToButton A boolean option to move the focus to the original button that opens the popout.
   */
  hide(moveFocusToButton?: boolean) {
    this.popout.hide(moveFocusToButton)
  }

  /**
   * Show the date picker programmatically.
   */
  show() {
    this.popout.show()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-date-picker": DatePicker
  }
}
