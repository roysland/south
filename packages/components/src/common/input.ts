export function cleanValue(inputEl: HTMLInputElement, regex: RegExp): string {
    const { value } = inputEl
    const cursor = inputEl.selectionStart as number
  
    const beforeCursor = value.slice(0, cursor)
    const afterCursor = value.slice(cursor, value.length)
  
    const filteredBeforeCursor = beforeCursor.replace(regex, "")
    const filterAfterCursor = afterCursor.replace(regex, "")
  
    const newValue = filteredBeforeCursor + filterAfterCursor
    const newCursor = filteredBeforeCursor.length
  
    inputEl.value = newValue
    inputEl.selectionStart = newCursor
    inputEl.selectionEnd = newCursor
  
    return newValue
  }
  