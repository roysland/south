/**
 * A base class for events which defaults to bubbling and composed
 */
export class NordEvent extends Event {
    constructor(type: string, eventInitDict?: EventInit) {
      super(type, {
        bubbles: true,
        composed: true,
        ...eventInitDict,
      })
    }
  }
  