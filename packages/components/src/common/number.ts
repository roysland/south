/**
 * Wraps a value so that it always falls within min/max,
 * where a value greater than max gets set to min, and vice versa
 */
export function wrap(val: number, min: number, max: number) {
    if (val > max) return min
    if (val < min) return max
    return val
  }
  
  export function range(from: number, to: number) {
    const result: number[] = []
  
    for (let i = from; i <= to; i++) {
      result.push(i)
    }
  
    return result
  }
  
  export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max))
  }
  