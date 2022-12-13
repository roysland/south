/**
 * Gets the currently focused element, taking shadow roots into account.
 */
export function getFocusedElement(root: Document | ShadowRoot): Element | undefined {
    if (root.activeElement?.shadowRoot) {
      return getFocusedElement(root.activeElement.shadowRoot)
    }
  
    return root.activeElement || undefined
  }
  