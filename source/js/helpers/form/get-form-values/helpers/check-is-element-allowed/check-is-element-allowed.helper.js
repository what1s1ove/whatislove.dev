import { checkHasName } from '../check-has-name/check-has-name.helper'
import { checkHasAllowedType } from '../check-has-allowed-type/check-has-allowed-type.helper'

const checkFunctions = [checkHasName, checkHasAllowedType]

const checkIsElementAllowed = (element) => {
  return checkFunctions.every((checkFunction) => checkFunction(element))
}

export { checkIsElementAllowed }
