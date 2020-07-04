import { getTargetValue } from './get-target-value.helper'

const getTargetNameValue = (target) => {
  const targetValue = {
    [target.name]: getTargetValue(target),
  }

  return targetValue
}

export { getTargetNameValue }
