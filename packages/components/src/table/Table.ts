import { LitElement, html, render } from "lit"
import { customElement, property } from "lit/decorators.js"
import style from "./Table.scss"

function isDocument(node: Node): node is Document {
  return node.nodeType === Node.DOCUMENT_NODE
}

/**
 * Table is used to organize and display information from a data set.
 * Provides table styles in addition to features like sticky
 * headers and support for narrow viewports.
 *
 * @status ready
 * @category list
 * @slot - Default slot which holds the HTML `<table>` element.
 *
 * @cssprop [--n-table-td-padding=calc(var(--n-space-m) * 0.95)] - Controls the padding around the table cells.
 * @cssprop [--n-table-border-radius=var(--n-border-radius-s)] - Controls how rounded the corners are, using [border radius tokens](/tokens/#border-radius).
 *
 * @usage https://stackblitz.com/github/nordhealth/advanced-table-examples/tree/main/nord-react-tanstack-table?embed=1&file=src/DataTable/DataTable.tsx&hideNavigation=1&view=preview - with react and tanstack table
 * @usage https://stackblitz.com/github/nordhealth/advanced-table-examples/tree/main/nord-react-ag-grid?embed=1&file=src/DataTable/DataTable.tsx&hideNavigation=1&view=preview - with react and ag grid
 * @usage https://stackblitz.com/github/nordhealth/advanced-table-examples/tree/main/nord-vue-tanstack-table?embed=1&file=src/components/DataTable/DataTable.vue&hideNavigation=1&view=preview - with vue and tanstack table
 * @usage https://stackblitz.com/github/nordhealth/advanced-table-examples/tree/main/nord-vue-ag-grid?embed=1&file=src/components/DataTable/DataTable.vue&hideNavigation=1&view=preview - with vue and ag grid
 */
@customElement("nord-table")
export default class Table extends LitElement {
  /**
   * Controls the density of the table's rows and headers.
   * Relaxed increases space, condensed reduces space.
   */
  @property({ reflect: true }) density: "condensed" | "default" | "relaxed" = "default"

  /**
   * Enables scroll-snapping, meaning the scroll position is always column-aligned.
   */
  @property({ reflect: true, type: Boolean, attribute: "scroll-snap" }) scrollSnap = false

  /**
   * Controls whether to use zebra striping on tables, which can improve readability.
   */
  @property({ type: Boolean, reflect: true }) striped = false

  connectedCallback() {
    super.connectedCallback()
    this.renderStyles()
  }

  /**
   * renders table styles into nearest root.
   * this is necessary since we do not use shadow dom.
   */
  private renderStyles() {
    const rootNode = this.getRootNode() as Document | ShadowRoot
    const renderTarget = isDocument(rootNode) ? rootNode.head : rootNode
    const tagName = this.localName

    const componentStyles = rootNode.querySelector(`style[data-component=${tagName}]`)
    if (componentStyles) {
      return
    }

    const fragment = document.createDocumentFragment()
    render(
      html`
        <style data-component=${tagName}>
          ${style}
        </style>
      `,
      fragment
    )
    renderTarget.appendChild(fragment)
  }

  /**
   * opt out of shadow dom
   */
  protected createRenderRoot() {
    return this
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nord-table": Table
  }
}
