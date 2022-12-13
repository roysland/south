import { Side, Placement, Alignment } from "@floating-ui/dom"

type FullPlacement = Exclude<Placement, Side>
export type LogicalSide = "block-end" | "block-start" | "inline-start" | "inline-end"
export type LogicalSideAlign = `${LogicalSide}-${Alignment}`
type Direction = "ltr" | "rtl"

const logicalMapLTR: Record<LogicalSideAlign, FullPlacement> = {
  "inline-start-start": "left-start",
  "inline-start-end": "left-end",
  "inline-end-start": "right-start",
  "inline-end-end": "right-end",
  "block-start-start": "top-start",
  "block-start-end": "top-end",
  "block-end-start": "bottom-start",
  "block-end-end": "bottom-end",
}

const logicalMapRTL: Record<LogicalSideAlign, FullPlacement> = {
  "inline-start-start": "right-start",
  "inline-start-end": "right-end",
  "inline-end-start": "left-start",
  "inline-end-end": "left-end",
  "block-start-start": "top-start",
  "block-start-end": "top-end",
  "block-end-start": "bottom-start",
  "block-end-end": "bottom-end",
}

const logicalMap: Record<LogicalSide, Side> = {
  "block-end": "bottom",
  "block-start": "top",
  "inline-start": "left",
  "inline-end": "right",
}

/**
 * Converts a single logical position to a physical position
 */
export function logicalToPhysical(logicalSide: LogicalSide): Side

/**
 * Converts a logical side and alignment to floating-ui compatible placement
 */
export function logicalToPhysical(logicalSide: LogicalSide, alignment: Alignment, dir: Direction): Placement

export function logicalToPhysical(logicalSide: LogicalSide, alignment?: Alignment, dir?: Direction) {
  if (alignment != null && dir != null) {
    const logicalSideAlign: LogicalSideAlign = `${logicalSide}-${alignment}`
    return dir === "ltr" ? logicalMapLTR[logicalSideAlign] : logicalMapRTL[logicalSideAlign]
  }

  return logicalMap[logicalSide]
}
