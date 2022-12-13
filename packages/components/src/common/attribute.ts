function getTokens(element: Element, attr: string) {
    const value = element.getAttribute(attr)
    return value ? value.split(/\s+/) : []
  }
  
  function setTokens(element: Element, attr: string, tokens: string[]) {
    element.setAttribute(attr, tokens.join(" "))
  }
  
  /**
   * Carefully adds a token to a space-separated attribute
   * Similar to classList, but for any attribute.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
   */
  export function add(element: Element, attr: string, token: string) {
    const tokens = getTokens(element, attr)
  
    if (!tokens.includes(token)) {
      setTokens(element, attr, tokens.concat(token))
    }
  }
  
  /**
   * Carefully removes a token from a space-separated attribute.
   * Similar to classList, but for any attribute.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
   */
  export function remove(element: Element, attr: string, token: string) {
    const tokens = getTokens(element, attr)
  
    if (tokens.includes(token)) {
      setTokens(
        element,
        attr,
        tokens.filter(t => t !== token)
      )
    }
  }
  