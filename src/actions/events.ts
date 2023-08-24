import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function dispatch_event(this: StreamElement) {
  const name = this.getAttribute("name")
  let template = null

  try {
    template = this.templateContent.textContent
  } catch (e) {
    // default to empty object
  }

  try {
    const detail = template ? JSON.parse(template) : {}

    if (name) {
      const options = { bubbles: true, cancelable: true, detail }
      const event = new CustomEvent(name, options)

      this.targetElements.forEach((element: Element) => element.dispatchEvent(event))
    } else {
      console.warn(`[TurboPower] no "name" provided for Turbo Streams operation "dispatch_event"`)
    }
  } catch (error: any) {
    console.error(
      `[TurboPower] error proccessing provided "detail" in "<template>" ("${template}") for Turbo Streams operation "dispatch_event". Error: "${error.message}"`,
    )
  }
}

export function registerEventsActions(streamActions: TurboStreamActions) {
  streamActions.dispatch_event = dispatch_event
}
