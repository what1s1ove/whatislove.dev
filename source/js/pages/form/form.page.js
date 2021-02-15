import { fillSelectOptions } from '~/helpers'
import { TimelineType, SkillType } from '~/common/enums'

const skillTypeOptions = Object.values(SkillType)
const TimelineTypeOptions = Object.values(TimelineType)

class FormPage {
  constructor({ timelineApi }) {
    this._timelineApi = timelineApi

    this._formNode = null

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

  async _handleSubmit(evt) {
    evt.preventDefault()

    const values = Object.fromEntries(new FormData(evt.target).entries())

    await this._timelineApi.saveTimeline(values)
  }
}

export { FormPage }
