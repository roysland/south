import en from "./en-us.js"

// gets list of properties beginning prefix
type PickStartsWith<Type, Prefix extends string> = {
  [Property in keyof Type]: Property extends `${Prefix}${string}` ? Property : never
}[keyof Type]

export type Translation = typeof en
export type WellKnownKeys = PickStartsWith<Translation, "$">

const subscribers = new Set<() => void>()
const translations = new Map<string, Translation>()

function update() {
  for (const subscriber of subscribers) {
    subscriber()
  }
}

// observe changes to the document's lang
const observer = new MutationObserver(update)
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"],
})

/**
 * Removes all registered translations
 */
export function clearTranslations() {
  translations.clear()
}

/**
 * Registers one or more translations
 */
export function registerTranslation(...translation: Translation[]) {
  translation.forEach(t => {
    const lang = t.$lang.toLowerCase()
    translations.set(lang, t)
  })

  update()
}

/**
 * subscribe to language changes
 * @param onChange callback for when either `lang` attr changes, or a new language is registered.
 * @returns cleanup function
 */
export function subscribe(onChange: () => void): () => void {
  subscribers.add(onChange)
  return () => subscribers.delete(onChange)
}

/**
 * Check whether there is a translation registered for the given lang
 * @param lang the lang code e.g. "en" or "en-GB"
 */
export function isTranslationRegistered(lang: string) {
  return translations.has(lang)
}

/**
 * Picks the most appropriate translation for the given language, from most specific to least specific.
 * First tries lang + region, then lang only, then fallback.
 */
export function resolveTranslation(langCode: string): Translation {
  const lang = langCode.toLowerCase()
  const [langOnly] = lang.split("-")

  return translations.get(lang) || translations.get(langOnly) || en
}
