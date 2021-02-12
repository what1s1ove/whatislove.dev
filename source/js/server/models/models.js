import { DatabaseColumn } from '../common/enums'
import { Timeline } from './timeline/timeline'

const initModels = ({ database }) => {
  const timelineModel = new Timeline({
    database,
    column: DatabaseColumn.TIMELINE,
  })

  return {
    timelineModel,
  }
}

export { initModels }
