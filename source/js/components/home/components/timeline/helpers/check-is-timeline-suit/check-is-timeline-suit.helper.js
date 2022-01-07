const checkIsTimelineSuit = (timelineItem, filterValues) => {
  const hasSkillType = filterValues.skillTypes[timelineItem.skillType]
  const hasType = filterValues.types[timelineItem.type]

  return hasSkillType && hasType
}

export { checkIsTimelineSuit }
