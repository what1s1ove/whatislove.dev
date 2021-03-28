import { getFormValues as getFormPayload } from 'form-payload'

const getFormValues = (formNode) => getFormPayload(formNode)

export { getFormValues }
