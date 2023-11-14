import { SkillType, TimelineType } from '~/common/enums/enums.js'
import { fillSelectOptions, getFormValues } from '~/helpers/helpers.js'

import { getTransformedTimeline } from './helpers/helpers.js'

let skillTypeOptions = Object.values(SkillType)
let TimelineTypeOptions = Object.values(TimelineType)

class Form {
  constructor({ timelineApi }) {
    this._timelineApi = timelineApi

    this._formNode = undefined

    this._handleSubmit = this._handleSubmit.bind(this)
  }

  init() {
    this._formNode = document.querySelector(`form[name="timeline"]`)

    this._initSelects()

    this._initListeners()
  }

  _initSelects() {
    fillSelectOptions(
      this._formNode.querySelector(`select[name="skillType"]`),
      skillTypeOptions,
    )
    fillSelectOptions(
      this._formNode.querySelector(`select[name="type"]`),
      TimelineTypeOptions,
    )
  }

  _initListeners() {
    this._formNode.addEventListener(`submit`, this._handleSubmit)
  }

  async _handleSubmit(event_) {
    event_.preventDefault()

    let formValues = getFormValues(this._formNode)

    await this._timelineApi.saveTimeline(getTransformedTimeline(formValues))

    this._formNode.reset()
  }
}

export { Form }
