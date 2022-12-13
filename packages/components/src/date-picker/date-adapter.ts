import { parseISODate, printISODate, createDate } from "../common/dates.js"

type CreateDate = typeof createDate
export type DateParser = (input: string, createDate: CreateDate) => Date | undefined
export type DateFormatter = (date: Date) => string

export interface DateAdapter {
  parse: DateParser
  format: DateFormatter
}

export const isoAdapter: DateAdapter = { parse: parseISODate, format: printISODate }
