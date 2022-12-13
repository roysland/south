import { NordEvent } from "../common/events.js"

export class DateSelectEvent extends NordEvent {
  constructor(name: string, public date: Date) {
    super(name)
  }
}
