import { LitElement, html, nothing } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js"
import { createRef, ref } from "lit/directives/ref.js"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"

import * as navigateIcon from "@nordhealth/icons/lib/assets/keyboard-arrow-up-down.js"
import * as enterIcon from "@nordhealth/icons/lib/assets/keyboard-return.js"
import * as backspaceIcon from "@nordhealth/icons/lib/assets/keyboard-backspace.js"

import { groupBy } from "../common/collection.js"
import { wrap } from "../common/number.js"
import { NordEvent } from "../common/events.js"
import { getFocusedElement } from "../common/focus.js"
import { LightDismissController } from "../common/controllers/LightDismissController.js"
import { KeyboardController } from "./KeyboardController.js"

import Icon from "../icon/Icon.js"
import "../visually-hidden/VisuallyHidden.js"
import "./CommandMenuAction.js"
import { ICommandMenuAction } from "./ICommandMenuAction.js"
import { SelectEvent } from "./SelectEvent.js"
import componentStyle from "../common/styles/Component.css"
import style from "./CommandMenu.css"
import { LocalizeController } from "../localization/LocalizeController.js"
import { cond } from "../common/directives/cond.js"
import { observe } from "../common/decorators/observe.js"

Icon.registerIcon(navigateIcon)
Icon.registerIcon(enterIcon)
Icon.registerIcon(backspaceIcon)

/**
 * Command Menu allows users to navigate and use an app without
 * touching the mouse and helps them transform into “power users”
 * who can harness more advanced features far faster.
 *
 * @status ready
 * @category action
 * @slot footer - Used to replace the default footer contents.
 * @fires open - The command menu was opened.
 * @fires close - The command menu was closed.
 * @fires {SelectEvent} nord-select - User selected a command from the menu.
 *
 * @cssprop [--n-command-menu-inline-size=640px] - Controls the max inline size, or width, of the command menu.
 * @cssprop [--n-command-menu-block-size=290px] - Controls the max block size, or height, of the command menu.
 * @cssprop [--n-command-menu-block-start=16%] - Controls the command menu offset from the block start, or top, of the screen.
 */
@customElement("nord-command-menu")
export default class CommandMenu extends LitElement {
  static styles = [componentStyle, style]

  private inputRef = createRef<HTMLInputElement>()
  private listRef = createRef<HTMLElement>()
  private previousFocus?: HTMLElement

  private localize = new LocalizeController<"nord-command-menu">(this)
  private dismissController = new LightDismissController(this, {
    isOpen: () => this.open,
    onDismiss: () => this.close(),
  })

  private keyboardController = new KeyboardController(this, {
    trigger: () => this.select(),
    goBack: () => this.goBack(),
    end: () => this.end(),
    start: () => this.start(),
    next: () => this.next(),
    previous: () => this.previous(),
    toggleOpen: () => this.toggleOpen(),
  })

  /**
   * Show or hide the command menu.
   */
  @property({ type: Boolean }) open = false

  /**
   * Hint text to display in the Command Menu search field.
   */
  @property({ type: String }) placeholder = "Type a command or search..."

  /**
   * Array of commands to be included in the menu.
   * Please see “Commands data” section for more documentation.
   */
  @property({ type: Array, attribute: false }) commands: Array<ICommandMenuAction> = []

  @state() private parent: ICommandMenuAction["parent"]
  @state() private search: string = ""
  @state() private bump = true
  @state() private selectedIndex = 0
  @state() private filteredCommands: Array<ICommandMenuAction> = []

  private get selected(): ICommandMenuAction {
    return this.filteredCommands[this.selectedIndex]
  }

  /**
   * Show the command menu programmatically.
   * @param options allows you to open the menu filtered to a specific parent command.
   */
  show(options: { parent?: string } = {}) {
    const notCancelled = this.dispatchEvent(new NordEvent("open", { cancelable: true }))

    if (notCancelled) {
      this.open = true
      this.setParent(options.parent)
    }
  }

  /**
   * Close the command menu programmatically.
   */
  close() {
    this.open = false
    this.previousFocus?.focus()
    this.previousFocus = undefined

    this.dispatchEvent(new NordEvent("close"))
  }

  /**
   * Toggle the open state programmatically.
   */
  toggleOpen() {
    if (this.open) {
      this.close()
    } else {
      this.show()
    }
  }

  /**
   * Focus the command menu's input.
   */
  focus() {
    this.inputRef.value?.focus()
  }

  override render() {
    const sections = groupBy(this.filteredCommands, "section")
    const activeDescendant = this.filteredCommands.length === 0 ? "no-results" : this.selected?.id

    return html`
      <div
        class=${classMap({
          "n-visible": this.open,
          "n-modal": true,
        })}
      >
        <div
          @animationend=${this.handleAnimationEnd}
          class=${classMap({
            "n-bump": this.bump,
            "n-modal-content": true,
          })}
        >
          <div class="n-search-wrapper">
            <nord-visually-hidden id="instructions"> ${this.localize.term("instructions")} </nord-visually-hidden>
            <input
              type="text"
              id="search"
              @input=${this.handleInput}
              @blur=${this.handleBlur}
              ${ref(this.inputRef)}
              placeholder=${this.placeholder}
              .value=${this.search}
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
              aria-label=${this.localize.term("inputLabel")}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              role="combobox"
              aria-controls="list"
              aria-expanded="true"
              aria-activedescendant=${ifDefined(activeDescendant)}
              aria-describedby="instructions"
            />
          </div>

          <div class="n-modal-body">
            <div id="list" ${ref(this.listRef)} role="listbox">
              ${this.filteredCommands.length === 0
                ? this.renderNoResults()
                : Array.from(sections, ([section, commands]) => this.renderSection(section, commands))}
            </div>
          </div>
          <slot name="footer">
            <div class="n-modal-footer">
              <span class="n-help">
                <nord-icon label="Arrow keys" name=${navigateIcon.title}></nord-icon>
                ${this.localize.term("footerArrowKeys")}
              </span>
              <span class="n-help">
                <nord-icon label="Enter key" name=${enterIcon.title}></nord-icon>
                ${this.localize.term("footerEnterKey")}
              </span>
              <span class="n-help">${this.localize.term("footerEscapeKey")}</span>
              <span class="n-help n-backspace">
                <nord-icon label="Backspace key" name=${backspaceIcon.title}></nord-icon>
                ${this.localize.term("footerBackspaceKey")}
              </span>
            </div>
          </slot>
        </div>
      </div>
    `
  }

  private renderNoResults() {
    return html`
      <div id="no-results" class="n-command-empty" role="option" aria-selected="true">
        <div class="n-title">${this.localize.term("noResults", this.search)}</div>
        <div class="n-tip">${this.localize.term("tip")}</div>
      </div>
    `
  }

  private renderSection(section: string | undefined, commands: ICommandMenuAction[]) {
    const sectionId = `section-${section}`

    // TODO: test on latest safari, since it seems to have issues with grouped options
    return html`
      <div role="group" aria-labelledby=${cond(section, sectionId)}>
        ${section ? html`<div class="n-group-header" role="presentation" id=${sectionId}>${section}</div>` : nothing}
        ${repeat(
          commands,
          command => command.id,
          command => html`
            <nord-command-menu-action
              id=${command.id}
              .command=${command}
              ?selected=${this.open && command.id === this.selected?.id}
              @click=${() => this.select(command)}
              role="option"
              aria-selected=${cond(command.id === this.selected?.id, "true")}
            ></nord-command-menu-action>
          `
        )}
      </div>
    `
  }

  @observe("commands")
  protected handleCommandsChange() {
    this.keyboardController.registerCommandShortcuts()
  }

  @observe("open")
  protected handleBump() {
    if (this.open) {
      this.bump = true
    }
  }

  @observe("open", "updated")
  protected focusOnOpen() {
    if (this.open) {
      this.previousFocus = getFocusedElement(document) as HTMLElement
      this.focus()

      if (this.listRef.value) {
        this.listRef.value.scrollTop = 0
      }
    }
  }

  private handleAnimationEnd() {
    this.bump = false
  }

  private handleBlur() {
    if (this.open) {
      this.focus()
    }
  }

  private handleInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    this.setSearch(input.value)
  }

  private select(command: ICommandMenuAction = this.selected) {
    const isParent = this.commands.some(item => item.parent === command.id)

    if (isParent) {
      this.setParent(command.id)
      this.bump = true
      this.focus()
    } else {
      this.close()
    }

    this.setSearch("")
    command.handler?.(this)

    // this is separated into two parts because of a bug in Custom Elements Analyzer, where it gets the event name wrong.
    // TODO: cleanup when bug is fixed.
    const event = new SelectEvent(command)
    this.dispatchEvent(event)
  }

  private start() {
    this.selectedIndex = 0
  }

  private end() {
    this.selectedIndex = this.filteredCommands.length - 1
  }

  private next() {
    this.selectedIndex = wrap(this.selectedIndex + 1, 0, this.filteredCommands.length - 1)
  }

  private previous() {
    this.selectedIndex = wrap(this.selectedIndex - 1, 0, this.filteredCommands.length - 1)
  }

  private goBack() {
    if (this.search) {
      return
    }

    if (this.parent) {
      const parentCommand = this.commands.find(command => command.id === this.parent)
      this.setParent(parentCommand?.parent)
    }
  }

  private setParent(parent?: ICommandMenuAction["parent"]) {
    this.parent = parent
    this.setSearch("")
  }

  private setSearch(str: string) {
    this.search = str
    this.selectedIndex = 0
  }

  @observe("search")
  @observe("parent")
  @observe("commands")
  private filterCommands() {
    const searchTerms = this.search.toLocaleLowerCase().split(/\s+/)

    this.filteredCommands = this.commands.filter(({ title, keywords = "", parent }) => {
      const searchSpace = `${title} ${keywords}`.toLocaleLowerCase()
      const matcher = searchTerms.every(term => searchSpace.includes(term))

      if (!this.parent && this.search) {
        // global search for items on root
        return matcher
      }

      // use looser equality check so that it handles `null` as command's `parent` value
      // eslint-disable-next-line eqeqeq
      return parent == this.parent && matcher
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-command-menu": CommandMenu
  }
}
