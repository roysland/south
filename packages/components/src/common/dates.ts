const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/

export const enum DaysOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export function createDate(year: string, month: string, day: string): Date | undefined {
  const dayInt = parseInt(day, 10)
  const monthInt = parseInt(month, 10)
  const yearInt = parseInt(year, 10)

  const isValid =
    Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0

  if (isValid) {
    const date = new Date(yearInt, monthInt - 1, dayInt)
    // this handles values where year is 0-99, which JS "helpfully" interprets as 1900-1999
    date.setFullYear(yearInt)

    return date
  }

  return undefined
}

/**
 * @param value date string in ISO format YYYY-MM-DD
 */
export function parseISODate(value: string): Date | undefined {
  if (!value) {
    return undefined
  }

  const matches = value.match(ISO_DATE_FORMAT)

  if (matches) {
    return createDate(matches[1], matches[2], matches[3])
  }

  return undefined
}

/**
 * print date in format YYYY-MM-DD
 * @param date
 */
export function printISODate(date: Date): string {
  if (!date) {
    return ""
  }

  const d = date.getDate().toString(10)
  const m = (date.getMonth() + 1).toString(10)
  const y = date.getFullYear().toString(10)

  return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
}

function today() {
  const date = new Date()
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0))
}

export function getDayNames(locale: string, weekday: Exclude<Intl.DateTimeFormatOptions["weekday"], undefined>) {
  const days = []
  const options = { weekday }
  const day = today()

  for (let i = 0; i < 7; i++) {
    days[day.getDay()] = day.toLocaleDateString(locale, options)
    day.setDate(day.getDate() + 1)
  }

  return days
}

export function getMonthNames(locale: string, month: Exclude<Intl.DateTimeFormatOptions["month"], undefined>) {
  const months = []
  const options = { month }

  // set to first of the month, so that all dates are valid
  const day = today()
  day.setDate(1)

  for (let i = 0; i < 12; i++) {
    months[day.getMonth()] = day.toLocaleDateString(locale, options)
    day.setMonth(day.getMonth() + 1)
  }

  return months
}

/**
 * Compare if two dates are in the same month of the same year.
 */
export function isEqualMonth(a?: Date, b?: Date): boolean {
  if (a == null || b == null) {
    return false
  }

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

/**
 * Compare if two dates are equal in terms of day, month, and year
 */
export function isEqual(a?: Date, b?: Date): boolean {
  if (a == null || b == null) {
    return false
  }

  return isEqualMonth(a, b) && a.getDate() === b.getDate()
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(date.getMonth() + months)
  return d
}

export function addYears(date: Date, years: number): Date {
  const d = new Date(date)
  d.setFullYear(date.getFullYear() + years)
  return d
}

export function startOfWeek(date: Date, firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek

  d.setDate(d.getDate() - diff)
  return d
}

export function endOfWeek(date: Date, firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek)

  d.setDate(d.getDate() + diff)
  return d
}

export function startOfMonth(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), 1)
  d.setFullYear(date.getFullYear())
  return d
}

export function endOfMonth(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  d.setFullYear(date.getFullYear())
  return d
}

export function setMonth(date: Date, month: number): Date {
  const d = new Date(date)
  d.setMonth(month)
  return d
}

export function setYear(date: Date, year: number): Date {
  const d = new Date(date)
  d.setFullYear(year)
  return d
}

/**
 * Ensures date is within range, returns min or max if out of bounds
 */
export function clamp(date: Date, min?: Date, max?: Date): Date {
  const time = date.getTime()

  if (min && min instanceof Date && time < min.getTime()) {
    return min
  }

  if (max && max instanceof Date && time > max.getTime()) {
    return max
  }

  return date
}

/**
 * Check if date is within a min and max
 */
export function inRange(date: Date, min?: Date, max?: Date): boolean {
  return clamp(date, min, max) === date
}

/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param start
 * @param end
 */
function getDaysInRange(start: Date, end: Date): Date[] {
  const days: Date[] = []
  let current = start

  while (!isEqual(current, end)) {
    days.push(current)
    current = addDays(current, 1)
  }

  days.push(current)

  return days
}

/**
 * given a date, return an array of dates from a calendar perspective
 * @param date
 * @param firstDayOfWeek
 */
export function getViewOfMonth(date: Date, firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday): Date[] {
  const start = startOfWeek(startOfMonth(date), firstDayOfWeek)
  const end = endOfWeek(endOfMonth(date), firstDayOfWeek)

  return getDaysInRange(start, end)
}
