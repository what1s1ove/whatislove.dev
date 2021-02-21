import { getElementsValues } from '../get-control-value/get-control-value.helper'
import { getAllowedElements } from './helpers'

const getFormValues = (formNode) => {
  const elements = getAllowedElements(Array.from(formNode.elements))

  return getElementsValues(formNode, elements)
}

export { getFormValues }
