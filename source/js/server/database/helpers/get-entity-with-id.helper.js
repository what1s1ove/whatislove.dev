import { getRandomId } from '~/helpers'

const getEntityWithId = (entity) => ({
  ...entity,
  id: getRandomId(),
})

export { getEntityWithId }
