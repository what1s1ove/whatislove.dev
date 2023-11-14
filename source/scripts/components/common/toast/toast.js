import { setAsyncTimeout } from '~/helpers/helpers.js'

import {
  CLEAN_MESSAGE_DELAY,
  TOAST_DEFAULT_DURATION,
  TOAST_SHOW_CLASS_NAME,
} from './common/constants.js'

class Toast {
  constructor() {
    this._toastNode = undefined
    this._messages = []
    this._isShowingMessage = false
  }

  async _displayToastMessage(messagePayload) {
    let { cb, duration = TOAST_DEFAULT_DURATION, message } = messagePayload

    this._toastNode.classList.add(TOAST_SHOW_CLASS_NAME)
    this._toastNode.textContent = message

    await setAsyncTimeout(() => {
      this._toastNode.classList.remove(TOAST_SHOW_CLASS_NAME)
    }, duration)

    await setAsyncTimeout(() => {
      this._toastNode.textContent = ``
    }, CLEAN_MESSAGE_DELAY)

    cb?.()
  }

  async _initShowingMessages() {
    let messagePayload = this._messages.shift()

    this._isShowingMessage = true

    await this._displayToastMessage(messagePayload)

    let hasMessages = this._messages.length > 0

    if (hasMessages) {
      this._initShowingMessages()

      return
    }

    this._isShowingMessage = false
  }

  init() {
    this._toastNode = document.querySelector(`.toast`)
  }

  pushMessage(message) {
    this._messages.push(message)

    if (!this._isShowingMessage) {
      this._initShowingMessages()
    }
  }
}

export { Toast }
