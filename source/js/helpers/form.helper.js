import { FormElementTypes } from '../common/map/index'

const getTargetValue = (target) => {
  let { type, checked, value } = target

  let targetValue = type === FormElementTypes.CHECKBOX ? checked : value

  return targetValue
}

const getTargetNameValue = (target) => {
  let targetValue = {
    [target.name]: getTargetValue(target),
  }

  return targetValue
}

const getFormValues = (formElements) => {
  let formFieldsets = [...formElements].filter(
    (it) => it.type === FormElementTypes.FIELDSET
  )

  let getFieldsetsValues = (fieldsets) => {
    let fieldsetsValues = [...fieldsets].reduce((acc, element) => {
      let { name, type, elements } = element

      // eslint-disable-next-line no-nested-ternary
      return name
        ? type === FormElementTypes.FIELDSET
          ? { ...acc, [name]: getFieldsetsValues(elements) }
          : { ...acc, ...getTargetNameValue(element) }
        : acc
    }, {})

    return fieldsetsValues
  }

  let formValues = getFieldsetsValues(formFieldsets)

  return formValues
}

export { getTargetValue, getFormValues, getTargetNameValue }
