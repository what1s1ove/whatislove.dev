import { getRandomId } from '~/helpers'

const getEntityWithId = (entity) => ({
  id: getRandomId(),
  ...entity,
})

export { getEntityWithId }
