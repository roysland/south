/**
 * Groups an array objects by property value
 * @param array the collection of objects to group
 * @param key the property to group by
 * @returns a Map keyed by property value, where values are are an array of objects with that property value.
 */
export function groupBy<TObject extends Record<any, any>, TKey extends keyof TObject>(
    array: Array<TObject>,
    key: TKey
  ) {
    const grouped = new Map<TObject[TKey], TObject[]>()
  
    for (const item of array) {
      const value = item[key]
      const collection = grouped.get(value) ?? []
  
      if (!grouped.has(value)) {
        grouped.set(value, [])
      }
      collection.push(item)
      grouped.set(value, collection)
    }
  
    return grouped
  }
  
  /**
   * Split an array into chunks of the given size
   * @param array
   * @param chunkSize
   * @returns
   */
  export function chunk<T>(array: T[], chunkSize: number): T[][] {
    const result = []
  
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
  
    return result
  }
  
  /**
   * maps over an array, starting at the given offset and wrapping around.
   * @param array
   * @param startingOffset
   * @param mapFn
   * @returns
   */
  export function mapWithOffset<T, U>(array: T[], startingOffset: number, mapFn: (item: T, i: number) => U): U[] {
    return array.map((_, i) => {
      const adjustedIndex = (i + startingOffset) % array.length
      return mapFn(array[adjustedIndex], adjustedIndex)
    })
  }
  