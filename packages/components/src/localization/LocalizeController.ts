import type { ReactiveController, ReactiveControllerHost } from "lit"
import { subscribe, resolveTranslation, Translation, WellKnownKeys } from "./translation.js"

// helper types...

// used to match any function
type Func = (...args: any[]) => any

// if object property is function, use return type, else value type
type Result<Type, Key extends keyof Type> = Type[Key] extends Func ? ReturnType<Type[Key]> : Type[Key]

// if object property is function,
type FuncParams<Type, K extends keyof Type> = Type[K] extends Func ? Parameters<Type[K]> : never

const noop = () => {
  // this function is intentionally left blank
}

export class LocalizeController<TComponentName extends Exclude<keyof Translation, WellKnownKeys>>
  implements ReactiveController
{
  private unsubscribe?: ReturnType<typeof subscribe>
  private resolvedTranslation: Translation

  constructor(private host: ReactiveControllerHost & HTMLElement, private options = { onLangChange: noop }) {
    host.addController(this)
    this.resolvedTranslation = resolveTranslation(this.lang)
  }

  /**
   * The lang of the document or element, with element taking precedence
   */
  get lang() {
    return this.host.lang || document.documentElement.lang
  }

  /**
   * The lang of the translation being applied.
   * This may not match the document/element lang, in case of fallback translation
   */
  get resolvedLang() {
    return this.resolvedTranslation.$lang
  }

  hostConnected() {
    this.unsubscribe = subscribe(this.handleLangChange)
    this.options.onLangChange()
  }

  hostDisconnected() {
    this.unsubscribe?.()
  }

  term<Key extends keyof Translation[TComponentName]>(
    key: Key,
    ...args: FuncParams<Translation[TComponentName], Key>
  ): Result<Translation[TComponentName], Key> {
    const componentName = this.host.localName as TComponentName
    const translation = this.resolvedTranslation[componentName]

    const t = translation[key]
    return typeof t === "function" ? t(...args) : t
  }

  private handleLangChange = () => {
    const resolved = resolveTranslation(this.lang)

    if (this.resolvedTranslation !== resolved) {
      this.resolvedTranslation = resolved

      this.options.onLangChange()
      this.host.requestUpdate()
    }
  }
}
