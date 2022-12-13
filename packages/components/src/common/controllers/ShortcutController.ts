import { ReactiveController, ReactiveControllerHost } from "lit"
import type { KeyBindingMap } from "tinykeys"
import tinykeys from "tinykeys"

type ShortcutTarget = Parameters<typeof tinykeys>[0]

const ARROW_RE = /Arrow(Up|Down|Left|Right)/g
const ESC_RE = /Escape/g

function normalise(shortcuts: KeyBindingMap) {
  const normalised: KeyBindingMap = {}

  Object.keys(shortcuts).forEach(keybinding => {
    normalised[keybinding] = shortcuts[keybinding]

    // Arrow and Escape keys in IE/Edge have different names
    if (ARROW_RE.test(keybinding)) {
      const mapped = keybinding.replace(ARROW_RE, (_match, capture) => capture)
      normalised[mapped] = normalised[keybinding]
    }
    if (ESC_RE.test(keybinding)) {
      const mapped = keybinding.replace(ESC_RE, () => "Esc")
      normalised[mapped] = normalised[keybinding]
    }
  })

  return normalised
}

export class ShortcutController implements ReactiveController {
  private unregister?: ReturnType<typeof tinykeys>

  constructor(
    host: ReactiveControllerHost,
    private shortcuts?: KeyBindingMap,
    private target: ShortcutTarget = window
  ) {
    host.addController(this)
  }

  hostConnected() {
    if (this.shortcuts) {
      this.bind(this.shortcuts)
    }
  }

  hostDisconnected() {
    this.unbind()
  }

  unbind() {
    this.unregister?.()
  }

  bind(shortcuts: KeyBindingMap) {
    this.unbind()
    this.shortcuts = shortcuts
    this.unregister = tinykeys(this.target, normalise(this.shortcuts))
  }
}

export type { KeyBindingMap as ShortcutMap }
