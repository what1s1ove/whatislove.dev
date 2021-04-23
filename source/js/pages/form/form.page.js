import { fillSelectOptions, getFormValues } from '~/helpers/helpers.js'
import { TimelineType, SkillType } from '~/common/enums/enums.js'
import { getTransformedTimeline } from './helpers/helpers.js'

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

    const formValues = getFormValues(this._formNode)

    await this._timelineApi.saveTimeline(getTransformedTimeline(formValues))

    this._formNode.reset()
  }
}

export { FormPage }
