import { FormElementType } from '~/common/enum'

const getTargetValue = (target) => {
  const { type, checked, value } = target

  const targetValue = type === FormElementType.CHECKBOX ? checked : value

  return targetValue
}

const getTargetNameValue = (target) => {
  const targetValue = {
    [target.name]: getTargetValue(target),
  }

  return targetValue
}

const getFormValues = (formElements) => {
  const formFieldsets = [...formElements].filter(
    (it) => it.type === FormElementType.FIELDSET
  )

  const getFieldsetsValues = (fieldsets) => {
    const fieldsetsValues = [...fieldsets].reduce((acc, element) => {
      const { name, type, elements } = element

      // eslint-disable-next-line no-nested-ternary
      return name
        ? type === FormElementType.FIELDSET
          ? { ...acc, [name]: getFieldsetsValues(elements) }
          : { ...acc, ...getTargetNameValue(element) }
        : acc
    }, {})

    return fieldsetsValues
  }

  const formValues = getFieldsetsValues(formFieldsets)

  return formValues
}

export { getTargetValue, getFormValues, getTargetNameValue }
