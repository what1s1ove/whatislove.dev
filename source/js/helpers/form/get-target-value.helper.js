import { FormElementType } from '~/common/enum'

const getTargetValue = (target) => {
  const { type, checked, value } = target

  const targetValue = type === FormElementType.CHECKBOX ? checked : value

  return targetValue
}

export { getTargetValue }
