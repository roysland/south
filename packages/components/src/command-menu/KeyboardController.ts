import { ReactiveController } from "lit"
import CommandMenu from "./CommandMenu.js"
import { ShortcutController, ShortcutMap } from "../common/controllers/ShortcutController.js"

type KeyboardActions = {
  trigger: () => void
  goBack: () => void
  start: () => void
  end: () => void
  next: () => void
  previous: () => void
  toggleOpen: () => void
}

const preventDefault = (fn: (e: Event) => void) => (e: Event) => {
  e.preventDefault()
  fn(e)
}

export class KeyboardController {
  private globalShortcuts: ShortcutController
  private navigationShortcuts: ShortcutController
  private commandShortcuts: ShortcutController

  constructor(private host: CommandMenu, actions: KeyboardActions) {
    host.addController(this as ReactiveController)

    this.commandShortcuts = new ShortcutController(host)
    this.globalShortcuts = new ShortcutController(host, { "$mod+k": preventDefault(actions.toggleOpen) })
    this.navigationShortcuts = new ShortcutController(
      host,
      {
        Enter: preventDefault(actions.trigger),
        Backspace: actions.goBack, // we don't want to prevent default, since that would stop backspace deleting chars
        End: preventDefault(actions.end),
        Home: preventDefault(actions.start),
        ArrowDown: preventDefault(actions.next),
        ArrowUp: preventDefault(actions.previous),
      },
      host
    )
  }

  registerCommandShortcuts() {
    const shortcuts: ShortcutMap = {}

    for (const command of this.host.commands) {
      if (command.shortcut) {
        shortcuts[command.shortcut] = () => command.handler?.(this.host)
      }
    }

    this.commandShortcuts.bind(shortcuts)
  }
}
