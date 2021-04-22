const checkIsTimelineSuit = (timelineItem, filterValues) => {
  return (
    filterValues.skillTypes[timelineItem.skillType] && filterValues.types[timelineItem.type]
  )
}

export { checkIsTimelineSuit }
