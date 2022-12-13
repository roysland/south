import { html, LitElement } from "lit"
import { customElement, property, query, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { repeat } from "lit/directives/repeat.js"
import { createKeybindingsHandler } from "tinykeys"
import * as arrowRightIcon from "@nordhealth/icons/lib/assets/arrow-right-small.js"
import * as arrowLeftIcon from "@nordhealth/icons/lib/assets/arrow-left-small.js"
import * as arrowDownIcon from "@nordhealth/icons/lib/assets/arrow-down-small.js"

import "../button/Button.js"
import "../visually-hidden/VisuallyHidden.js"
import Icon from "../icon/Icon.js"

import { isHorizontalSwipe, SwipeController } from "../common/controllers/SwipeController.js"
import { DirectionController } from "../common/controllers/DirectionController.js"
import { LocalizeController } from "../localization/LocalizeController.js"
import { chunk, mapWithOffset } from "../common/collection.js"
import { cond } from "../common/directives/cond.js"
import { range } from "../common/number.js"
import {
  addDays,
  clamp,
  DaysOfWeek,
  endOfMonth,
  endOfWeek,
  getDayNames,
  getMonthNames,
  getViewOfMonth,
  inRange,
  isEqual,
  isEqualMonth,
  parseISODate,
  printISODate,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
} from "../common/dates.js"
import { observe } from "../common/decorators/observe.js"

import { DateSelectEvent } from "./DateSelectEvent.js"
import componentStyle from "../common/styles/Component.css"
import style from "./Calendar.css"

export type DatePredicate = (date: Date) => boolean

Icon.registerIcon(arrowRightIcon)
Icon.registerIcon(arrowLeftIcon)
Icon.registerIcon(arrowDownIcon)

const preventDefault = (fn: EventListener) => (e: Event) => {
  e.preventDefault()
  fn(e)
}

const isDateDisabled: DatePredicate = () => false
const isDateHighlighted = () => false

const dialogLabelId = "dialog-header"

/**
 * Calendar allows user to pick a date. It comes with built-in
 * functionality that allows you to set a minimum and a maximum allowed date.
 * Please note that the date must be passed in ISO-8601 format.
 *
 * @status ready
 * @category list
 * @fires {DateSelectEvent} change - Dispatched when a date is selected and the value changes.
 * @fires {DateSelectEvent} nord-focus-date - Dispatched when the calendar's focused date changes.
 *
 * @cssprop [--n-calendar-border-radius=var(--n-border-radius)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 * @cssprop [--n-calendar-box-shadow=var(--n-box-shadow-popout)] - Controls the surrounding shadow, using [box shadow tokens](/tokens/#box-shadow).
 */
@customElement("nord-calendar")
export default class Calendar extends LitElement {
  static styles = [componentStyle, style]

  @query(".n-calendar-select-month", true) private monthSelectNode!: HTMLElement
  @query(`button[tabindex="0"]`) private focusedDayNode!: HTMLButtonElement

  private direction = new DirectionController(this)
  private swipe = new SwipeController(this, {
    matchesGesture: isHorizontalSwipe,
    onSwipeEnd: ({ distX }) => this.addMonths(distX < 0 ? 1 : -1),
  })

  private shortcuts = createKeybindingsHandler({
    ArrowRight: preventDefault(() => this.addDays(this.direction.isLTR ? 1 : -1)),
    ArrowLeft: preventDefault(() => this.addDays(this.direction.isLTR ? -1 : 1)),
    ArrowDown: preventDefault(() => this.addDays(7)),
    ArrowUp: preventDefault(() => this.addDays(-7)),
    Home: preventDefault(() => this.startOfWeek()),
    End: preventDefault(() => this.endOfWeek()),
    PageUp: preventDefault(() => this.addMonths(-1)),
    PageDown: preventDefault(() => this.addMonths(1)),
    "Shift+PageUp": preventDefault(() => this.addYears(-1)),
    "Shift+PageDown": preventDefault(() => this.addYears(1)),
  })

  private localize = new LocalizeController<"nord-calendar">(this, {
    onLangChange: () => this.handleLangChange(),
  })

  /**
   * Whilst dateAdapter is used for handling the formatting/parsing dates in the input,
   * these are used to format dates exclusively for the benefit of screen readers.
   *
   * We prefer DateTimeFormat over date.toLocaleDateString, as the former has
   * better performance when formatting large number of dates. See:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#Performance
   */
  private dateFormatShort!: Intl.DateTimeFormat
  private monthNames!: string[]
  private monthNamesShort!: string[]
  private dayNames!: string[]
  private dayNamesShort!: string[]

  /**
   * The selected date on the calendar. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  @property() value: string = ""

  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  @property({ type: Number }) firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday

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
   * Controls whether the calendar expands to fill the width of its container.
   */
  @property({ reflect: true, type: Boolean }) expand = false

  /**
   * Controls which days are disabled and therefore disallowed.
   * For example, this can be used to disallow selection of weekends.
   */
  @property({ attribute: false }) isDateDisabled: DatePredicate = isDateDisabled

  /**
   * Controls which days are highlighted with a small indicator.
   * Returning a "falsy" value will not show an indicator.
   * Returning "truthy" value will show the indicator, but without an accessible label.
   * Returning a string will show the indicator, and use the string as accessible label.
   * It is recommended to return a string rather than a truthy value whenever possible.
   */
  @property({ attribute: false }) isDateHighlighted: (date: Date) => string | boolean = isDateHighlighted

  @state() private activeFocus = false
  @state() private focusedDay = new Date()

  /**
   * Programmatically move focus to the calendar.
   * @param options An object which controls aspects of the focusing process.
   */
  focus(options?: FocusOptions & { target: "day" | "month" }) {
    const target = options?.target ?? "day"

    if (target === "day") {
      this.focusedDayNode.focus()
    } else if (target === "month") {
      this.monthSelectNode.focus()
    }
  }

  render() {
    const today = new Date()
    const valueAsDate = parseISODate(this.value)
    const focusedMonth = this.focusedDay.getMonth()
    const focusedYear = this.focusedDay.getFullYear()

    const minDate = parseISODate(this.min)
    const maxDate = parseISODate(this.max)
    const minDateStartOfMonth = minDate ? startOfMonth(minDate) : undefined
    const maxDateEndOfMonth = maxDate ? endOfMonth(maxDate) : undefined

    const selectedYear = (valueAsDate || this.focusedDay).getFullYear()
    const minYear = minDate ? minDate.getFullYear() : selectedYear - 10
    const maxYear = maxDate ? maxDate.getFullYear() : selectedYear + 10

    return html`
      <div class="n-calendar">
        <div class="n-calendar-header">
          <div>
            <nord-visually-hidden>
              <h2 id=${dialogLabelId} aria-live="polite" aria-atomic="true">
                ${this.monthNames[focusedMonth]}, ${this.focusedDay.getFullYear()}
              </h2>
            </nord-visually-hidden>

            <div class="n-calendar-select">
              <select
                aria-label=${this.localize.term("monthSelectLabel")}
                class="n-calendar-select-month"
                @input=${this.handleMonthSelect}
              >
                ${this.monthNames.map(
                  (month, i) =>
                    html`
                      <option
                        value=${i}
                        ?selected=${i === focusedMonth}
                        ?disabled=${!inRange(new Date(focusedYear, i, 1), minDateStartOfMonth, maxDateEndOfMonth)}
                      >
                        ${month}
                      </option>
                    `
                )}
              </select>
              <div class="n-calendar-select-label" aria-hidden="true">
                <span>${this.monthNamesShort[focusedMonth]}</span>
                <nord-icon color="var(--n-color-icon)" name="arrow-down-small" size="xxs"></nord-icon>
              </div>
            </div>

            <div class="n-calendar-select">
              <select
                aria-label=${this.localize.term("yearSelectLabel")}
                class="n-calendar-select-year"
                @input=${this.handleYearSelect}
              >
                ${repeat(
                  range(minYear, maxYear),
                  year => year,
                  year => html`<option ?selected=${year === focusedYear}>${year}</option>`
                )}
              </select>
              <div class="n-calendar-select-label" aria-hidden="true">
                <span>${this.focusedDay.getFullYear()}</span>
                <nord-icon color="var(--n-color-icon)" name="arrow-down-small" size="xxs"></nord-icon>
              </div>
            </div>
          </div>

          <div class="n-calendar-nav">
            <nord-button
              class="n-calendar-prev"
              @click=${this.handlePreviousMonthClick}
              ?disabled=${isEqualMonth(minDate, this.focusedDay)}
              type="button"
            >
              <nord-visually-hidden>${this.localize.term("prevMonthLabel")}</nord-visually-hidden>
              <nord-icon name=${this.direction.isLTR ? "arrow-left-small" : "arrow-right-small"} size="s"></nord-icon>
            </nord-button>

            <nord-button
              class="n-calendar-next"
              @click=${this.handleNextMonthClick}
              ?disabled=${isEqualMonth(maxDate, this.focusedDay)}
              type="button"
            >
              <nord-visually-hidden>${this.localize.term("nextMonthLabel")}</nord-visually-hidden>
              <nord-icon name=${this.direction.isLTR ? "arrow-right-small" : "arrow-left-small"} size="s"></nord-icon>
            </nord-button>
          </div>
        </div>

        <table
          class="n-calendar-table"
          aria-labelledby=${dialogLabelId}
          @focusin=${this.enableActiveFocus}
          @focusout=${this.disableActiveFocus}
        >
          <thead>
            <tr>
              ${mapWithOffset(
                this.dayNames,
                this.firstDayOfWeek,
                (dayName, i) =>
                  html`
                    <th class="n-calendar-table-header" scope="col">
                      <span aria-hidden="true">${this.dayNamesShort[i]}</span>
                      <nord-visually-hidden>${dayName}</nord-visually-hidden>
                    </th>
                  `
              )}
            </tr>
          </thead>
          <tbody>
            ${chunk(getViewOfMonth(this.focusedDay, this.firstDayOfWeek), 7).map(
              week =>
                html`
                  <tr class="n-calendar-row">
                    ${week.map(day => {
                      const outsideRange = !inRange(day, minDate, maxDate)
                      const isToday = isEqual(day, today)
                      const isDisabled = this.isDateDisabled(day)
                      const isSelected = isEqual(day, valueAsDate)
                      const isInMonth = isEqualMonth(day, this.focusedDay)
                      const isHighlighted = this.isDateHighlighted(day)
                      const formattedDate = this.dateFormatShort.format(day)

                      const accessibleLabel =
                        isHighlighted && typeof isHighlighted === "string"
                          ? `${formattedDate}, ${isHighlighted}`
                          : formattedDate

                      return html`
                        <td class="n-calendar-cell">
                          <button
                            type="button"
                            tabindex=${isEqual(day, this.focusedDay) ? 0 : -1}
                            class=${classMap({
                              "n-calendar-day": true,
                              "is-outside": outsideRange,
                              "is-month": isInMonth,
                              "is-highlighted": isHighlighted,
                            })}
                            @click=${() => this.handleDaySelect(day)}
                            @keydown=${this.shortcuts}
                            ?disabled=${outsideRange}
                            aria-disabled=${cond(isDisabled, "true")}
                            aria-pressed=${isSelected ? "true" : "false"}
                            aria-current=${cond(isToday, "date")}
                            aria-label=${accessibleLabel}
                          >
                            <span aria-hidden="true">${day.getDate()}</span>
                          </button>
                        </td>
                      `
                    })}
                  </tr>
                `
            )}
          </tbody>
        </table>
      </div>
    `
  }

  @observe("value")
  protected handleValueChange() {
    this.setFocusedDay(parseISODate(this.value) || new Date())
  }

  @observe("focusedDay", "updated")
  protected handleFocusedDayChange() {
    if (this.activeFocus) {
      this.focusedDayNode.focus()
    }
  }

  private handleLangChange() {
    const lang = this.localize.resolvedLang
    this.dateFormatShort = new Intl.DateTimeFormat(lang, { day: "numeric", month: "long" })
    this.monthNames = getMonthNames(lang, "long")
    this.monthNamesShort = getMonthNames(lang, "short")
    this.dayNames = getDayNames(lang, "long")
    this.dayNamesShort = getDayNames(lang, "narrow")
  }

  private handleDaySelect = (day: Date) => {
    const isInRange = inRange(day, parseISODate(this.min), parseISODate(this.max))
    const isAllowed = !this.isDateDisabled(day)

    if (isInRange && isAllowed) {
      this.value = printISODate(day)
      this.dispatchEvent(new DateSelectEvent("change", day))
    }
  }

  private addDays(days: number) {
    this.setFocusedDay(addDays(this.focusedDay, days))
  }

  private addMonths(months: number) {
    this.setMonth(this.focusedDay.getMonth() + months)
  }

  private addYears(years: number) {
    this.setYear(this.focusedDay.getFullYear() + years)
  }

  private startOfWeek() {
    this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek))
  }

  private endOfWeek() {
    this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek))
  }

  private setMonth(month: number) {
    const min = setMonth(startOfMonth(this.focusedDay), month)
    const max = endOfMonth(min)
    const date = setMonth(this.focusedDay, month)

    this.setFocusedDay(clamp(date, min, max))
  }

  private setYear(year: number) {
    const min = setYear(startOfMonth(this.focusedDay), year)
    const max = endOfMonth(min)
    const date = setYear(this.focusedDay, year)

    this.setFocusedDay(clamp(date, min, max))
  }

  private setFocusedDay(day: Date) {
    this.focusedDay = clamp(day, parseISODate(this.min), parseISODate(this.max))
    this.dispatchEvent(new DateSelectEvent("nord-focus-date", this.focusedDay))
  }

  private handleMonthSelect = (e: Event) => {
    this.setMonth(parseInt((e.target as HTMLSelectElement).value, 10))
  }

  private handleYearSelect = (e: Event) => {
    this.setYear(parseInt((e.target as HTMLSelectElement).value, 10))
  }

  private handleNextMonthClick = (event: MouseEvent) => {
    event.preventDefault()
    this.addMonths(1)
  }

  private handlePreviousMonthClick = (event: MouseEvent) => {
    event.preventDefault()
    this.addMonths(-1)
  }

  private enableActiveFocus = () => {
    this.activeFocus = true
  }

  private disableActiveFocus = (e: FocusEvent) => {
    const table = e.currentTarget as Node
    const relatedTarget = e.relatedTarget as Node

    if (relatedTarget && !table.contains(relatedTarget)) {
      this.activeFocus = false
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-calendar": Calendar
  }
}
