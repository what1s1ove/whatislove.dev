const getTransformedTimeline = (timeline) => {
  return Object.keys(timeline).reduce((acc, key) => {
    acc[key] = timeline[key] ?? ``
    return acc
  }, {})
}

export { getTransformedTimeline }
