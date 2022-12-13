import { LitElement, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"

import componentStyle from "../common/styles/Component.scss"
import stickyStyle from "../common/styles/Sticky.scss"
import style from "./TabGroup.scss"
import Tab from "../tab/Tab.js"

import { DirectionController } from "../common/controllers/DirectionController.js"

let tabGroupCount = 1

/**
 * Tab Group allows multiple panels to be contained within a single window,
 * using tabs as a navigational element.
 *
 * @status ready
 * @category navigation
 * @slot - The element which contains the content to be revealed.
 * @slot tab - The element which contains all tabs to reveal tabbed content.
 *
 * @cssprop [--n-tab-group-padding=0] - Controls the padding around the tab group (including the tab list), using our [spacing tokens](/tokens/#space).
 */
@customElement("nord-tab-group")
export default class TabGroup extends LitElement {
  static styles = [componentStyle, stickyStyle, style]

  private direction = new DirectionController(this)

  private observer?: MutationObserver

  private static observerOptions = {
    attributes: true,
    subtree: true,
    attributeFilter: ["selected"],
    attributeOldValue: true,
  }

  /**
   * Unique ID for each tab group component present.
   */
  private tabGroupId = `nord-tab-group-${tabGroupCount++}`

  /**
   * Adds an accessible label to the tab list container.
   */
  @property({ reflect: true }) label: string = ""

  /**
   * Controls the padding of the tab group component.
   */
  @property({ reflect: true }) padding?: "m" | "l" | "none" = "m"

  /**
   * Whether the tab list sticks to the top of the tab group as you scroll.
   */
  @property({ reflect: true, type: Boolean }) sticky: boolean = false

  /**
   * The current tab node selected in the tab group.
   */
  @state() private selectedTab = this.initialSelectedTab

  render() {
    return html`
      <div class="n-tab-group is-${this.direction.dir}">
        <div
          class="n-tab-group-list n-sticky"
          role="tablist"
          aria-label="${this.label}"
          @click=${this.handleTabChange}
          @keydown=${this.handleKeydown}
        >
          <slot name="tab"></slot>
        </div>
        <slot></slot>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.updateSlots()
  }

  private updateSlots() {
    this.setupTabs()
    this.setupPanels()
  }

  firstUpdated() {
    this.observer = new MutationObserver(this.handleMutation)
    this.observer?.observe(this, TabGroup.observerOptions)
  }

  /**
   * If the selected tab is selected programmatically update all the tabs.
   */
  private handleMutation = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === "selected" && mutation.oldValue === null) {
        const selectedTab = <Tab>mutation.target
        this.observer?.disconnect()
        this.updateSelectedTab(selectedTab)
        this.observer?.observe(this, TabGroup.observerOptions)
      }
    })
  }

  /**
   * Get the selected tab button, or the first tab button.
   */
  private get initialSelectedTab() {
    return this.querySelector("nord-tab[selected]") || this.querySelector("nord-tab")
  }

  /**
   * Apply accessible attributes and values to the tab buttons.
   */
  private setupTabs() {
    const tabs = this.querySelectorAll("nord-tab")

    tabs.forEach((tab, index) => {
      tab.setAttribute("id", `${this.tabGroupId}-tab-${index + 1}`)
      tab.setAttribute("aria-controls", `${this.tabGroupId}-panel-${index + 1}`)
      tab.toggleAttribute("selected", tab === this.selectedTab)
    })
  }

  /**
   * Apply accessible attributes and values to the tab panels.
   */
  private setupPanels() {
    const panels = this.querySelectorAll("nord-tab-panel")
    const selectedPanelId = this.selectedTab?.getAttribute("aria-controls")

    panels.forEach((panel, index) => {
      panel.setAttribute("id", `${this.tabGroupId}-panel-${index + 1}`)
      panel.setAttribute("aria-labelledby", `${this.tabGroupId}-tab-${index + 1}`)
      panel.setAttribute("aria-hidden", `${panel.getAttribute("id") !== selectedPanelId}`)
    })
  }

  private handleTabChange(event: Event) {
    // Always reset the scroll when a tab is selected.
    this.scrollTo({ top: 0 })

    /**
     * Return handler if it's not a tab or if it's already selected
     */
    if (!(event.target instanceof Tab) || event.target === this.selectedTab) return

    this.updateSelectedTab(event.target)
  }

  /**
   * Get the previous tab button in the tab group
   */
  private previousTab(tab: Tab) {
    const tabs = [...this.querySelectorAll("nord-tab")]
    const selectedTabIndex = tabs.indexOf(tab)
    return tabs[selectedTabIndex - 1]
  }

  /**
   * Handle keyboard accessible controls.
   */
  private handleKeydown(event: KeyboardEvent) {
    const tab = <Tab>event.target

    const firstTab = <Tab>this.querySelector("nord-tab:first-of-type")
    const lastTab = <Tab>this.querySelector("nord-tab:last-of-type")
    const nextTab = <Tab>this.querySelector(`#${tab.getAttribute("id")} ~ nord-tab`) || firstTab
    const previousTab = <Tab>this.previousTab(tab) || lastTab

    const updateTab = (selectedTab: Tab, keyEvent: Event) => {
      keyEvent.preventDefault()

      // Always reset the scroll when a tab is selected.
      this.scrollTo({ top: 0 })
      this.updateSelectedTab(selectedTab)
    }

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        updateTab(this.direction.isLTR ? previousTab : nextTab, event)
        break

      case "ArrowRight":
      case "ArrowDown":
        updateTab(this.direction.isLTR ? nextTab : previousTab, event)
        break

      case "Home":
        updateTab(firstTab, event)
        break

      case "End":
        updateTab(lastTab, event)
        break

      default:
        break
    }
  }

  /**
   * Update the selected tab button with attributes and values.
   * Update the tab group state.
   */
  private updateSelectedTab(selectedTab: Tab) {
    const selectedPanel = this.querySelector(`#${selectedTab.getAttribute("aria-controls")}`)

    if (selectedTab === this.selectedTab) return

    /**
     * Reset all the selected state of the tabs, and select the clicked tab
     */
    this.querySelectorAll("nord-tab").forEach(tab => {
      tab.removeAttribute("selected")
      if (tab === selectedTab) {
        tab.setAttribute("selected", "")
        tab.focus()
        tab.scrollIntoView({ block: "nearest", inline: "nearest" })
        this.selectedTab = tab
      }
    })

    /**
     * Reset all the visibility of the panels,
     * and show the panel related to the selected tab
     */
    this.querySelectorAll("nord-tab-panel").forEach(panel => {
      panel.setAttribute("aria-hidden", `${panel !== selectedPanel}`)
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-tab-group": TabGroup
  }
}
