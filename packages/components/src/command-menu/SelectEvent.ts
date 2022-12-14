import { NordEvent } from "../common/events.js"
import { ICommandMenuAction } from "./ICommandMenuAction.js"

export class SelectEvent extends NordEvent {
  static eventName = "kabal-select"

  constructor(public command: ICommandMenuAction) {
    super(SelectEvent.eventName)
  }
}
