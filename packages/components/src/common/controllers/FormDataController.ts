import { ReactiveController, ReactiveControllerHost } from "lit"
import { InputMixinInterface } from "../mixins/InputMixin.js"
import { EventController } from "./EventController.js"

type FormDataOptions = {
  value: () => string | undefined
}

export class FormDataController implements ReactiveController {
  private events: EventController
  constructor(private host: ReactiveControllerHost & InputMixinInterface, private options: FormDataOptions) {
    host.addController(this)
    this.events = new EventController(host)
  }

  hostConnected() {
    if (this.host.form) {
      this.events.listen(this.host.form, "formdata", this.handleFormData)
    }
  }

  private handleFormData = (e: FormDataEvent) => {
    const { disabled, name } = this.host

    if (disabled) {
      return
    }

    const value = this.options.value()

    if (name && value != null) {
      e.formData.append(name, value)
    }
  }
}
