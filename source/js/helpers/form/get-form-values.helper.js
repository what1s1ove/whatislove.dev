import { getTargetNameValue } from './get-target-name-value.helper'
import { FormElementType } from '~/common/enums'

const getFormValues = (formElements) => {
  const formFieldsets = [...formElements].filter(
    (it) => it.type === FormElementType.FIELDSET,
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

export { getFormValues }
