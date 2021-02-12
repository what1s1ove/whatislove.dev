import { DatabaseColumn } from '../common/enums'
import { Timeline } from './timeline/timeline'

const initModels = ({ database }) => {
  const timeline = new Timeline({
    database,
    column: DatabaseColumn.TIMELINE,
  })

  return {
    timeline,
  }
}

export { initModels }
