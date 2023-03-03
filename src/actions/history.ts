import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function push_state(this: StreamElement) {
  const url = this.getAttribute("url")
  const state = this.getAttribute("state")
  const title = this.getAttribute("title") || ""

  window.history.pushState(state, title, url)
}

export function replace_state(this: StreamElement) {
  const url = this.getAttribute("url")
  const state = this.getAttribute("state")
  const title = this.getAttribute("title") || ""

  window.history.replaceState(state, title, url)
}

export function history_back(this: StreamElement) {
  window.history.back()
}

export function history_forward(this: StreamElement) {
  window.history.forward()
}

export function history_go(this: StreamElement) {
  const delta = Number(this.getAttribute("delta")) || 0
  window.history.go(delta)
}

export function registerHistoryActions(streamActions: TurboStreamActions) {
  streamActions.push_state = push_state
  streamActions.replace_state = replace_state
  streamActions.history_back = history_back
  streamActions.history_go = history_go
}
