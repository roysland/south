/**
 * Finds a form's submit button. First looking for a button inside form,
 * and then looking for a button whose form attribute is equal to the ID of the form.
 */
export function getSubmitButton(form: HTMLFormElement): HTMLButtonElement | null {
    // we can get away with just looking for native <button> elements,
    // rather than our component, since our button component renders one to light dom.
    let button = form.querySelector<HTMLButtonElement>(`button[type="submit"]`)
  
    if (!button && form.id) {
      const root = form.getRootNode() as ShadowRoot | Document
      button = root.querySelector<HTMLButtonElement>(`button[form=${form.id}]`)
    }
  
    return button
  }
  