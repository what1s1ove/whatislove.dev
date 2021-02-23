import { ControlType } from '~/common/enums'
import { checkIsReferToAnotherNode } from './helpers'

const geControlValue = (controlNode) => {
  const { type, checked, value, valueAsDate, valueAsNumber } = controlNode

  switch (type) {
    case ControlType.COLOR:
    case ControlType.EMAIL:
    case ControlType.HIDDEN:
    case ControlType.PASSWORD:
    case ControlType.RADIO:
    case ControlType.SEARCH:
    case ControlType.TEL:
    case ControlType.TEXT:
    case ControlType.TEXTAREA:
    case ControlType.URL:
    case ControlType.OUTPUT:
    case ControlType.SELECT_ONE: {
      return value
    }
    case ControlType.DATE:
    case ControlType.DATETIME_LOCAL:
    case ControlType.MONTH:
    case ControlType.TIME:
    case ControlType.WEEK: {
      return valueAsDate ?? value
    }
    case ControlType.NUMBER:
    case ControlType.RANGE: {
      return valueAsNumber
    }
    case ControlType.CHECKBOX: {
      return checked
    }
    case ControlType.FIELDSET: {
      // eslint-disable-next-line no-use-before-define
      return getElementsValues(controlNode.elements)
    }
  }

  return null
}

const getElementsValues = (controlNodeElements) => {
  return Array.from(controlNodeElements).reduce((acc, element, _idx, arr) => {
    const isReferToAnotherNode = checkIsReferToAnotherNode(element, ...arr)

    if (isReferToAnotherNode) {
      return acc
    }

    return {
      ...acc,
      [element.name]: geControlValue(element),
    }
  }, {})
}

export { geControlValue, getElementsValues }
