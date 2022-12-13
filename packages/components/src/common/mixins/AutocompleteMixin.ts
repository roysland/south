/* eslint-disable max-classes-per-file */
import { LitElement } from "lit"
import { property } from "lit/decorators.js"

type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T
type AutocompleteAttribute =
  | "off"
  | "on"
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "honorific-suffix"
  | "nickname"
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "organization-title"
  | "organization"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "transaction-currency"
  | "transaction-amount"
  | "language"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-area-code"
  | "tel-local"
  | "tel-extension"
  | "impp"
  | "url"
  | "photo"

export declare class AutocompleteMixinInterface {
  autocomplete: AutocompleteAttribute
}

export function AutocompleteMixin<T extends Constructor<LitElement>>(
  superClass: T
): Constructor<AutocompleteMixinInterface> & T {
  class AutocompleteElement extends superClass {
    /**
     * Specifies the data type of the field, so that the browser may attempt to fill out the field automatically on behalf of the user.
     */
    @property() autocomplete: AutocompleteAttribute = "off"
  }

  return AutocompleteElement
}
