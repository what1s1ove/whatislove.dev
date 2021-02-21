import { ControlType } from '~/common/enums'

const BANNED_CONTROL_TYPES = [
  ControlType.BUTTON,
  ControlType.RESET,
  ControlType.SUBMIT,
]

const checkHasAllowedType = (element) => {
  const hasBannedType = BANNED_CONTROL_TYPES.some(
    (type) => type === element.type,
  )

  return !hasBannedType
}

export { checkHasAllowedType }
