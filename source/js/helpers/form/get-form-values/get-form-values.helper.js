import { ControlType } from '~/common/enums'
import { getElementsValues } from '../get-control-value/get-control-value.helper'

const BANNED_CONTROL_TYPES = [ControlType.BUTTON, ControlType.RESET, ControlType.SUBMIT]

const checkHasName = (element) => {
  return Boolean(element.name)
}

const checkHasAllowedType = (element) => {
  const hasBannedType = BANNED_CONTROL_TYPES.some((type) => type === element.type)

  return !hasBannedType
}

const checkFunctions = [checkHasName, checkHasAllowedType]

const checkIsElementAllowed = (element) => {
  return checkFunctions.every((checkFunction) => checkFunction(element))
}

const getAllowedElements = (elements) => {
  return elements.filter(checkIsElementAllowed)
}

const getFormValues = (formNode) => {
  const elements = getAllowedElements(Array.from(formNode.elements))

  return getElementsValues(formNode, elements)
}

export { getFormValues }
