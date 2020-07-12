import { FormElementType } from '~/common/enums'

const getTargetValue = (target) => {
  const { type, checked, value } = target

  const targetValue = type === FormElementType.CHECKBOX ? checked : value

  return targetValue
}

export { getTargetValue }
