let checkIsTimelineSuit = (timelineItem, filterValues) => {
  let hasSkillType = filterValues.skillTypes[timelineItem.skillType]
  let hasType = filterValues.types[timelineItem.type]

  return hasSkillType && hasType
}

export { checkIsTimelineSuit }
