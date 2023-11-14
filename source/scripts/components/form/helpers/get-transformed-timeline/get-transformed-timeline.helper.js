const getTransformedTimeline = (timeline) => {
  const transformedTimeline = { ...timeline }

  for (const key of Object.keys(transformedTimeline)) {
    transformedTimeline[key] = transformedTimeline[key] ?? ``
  }

  return transformedTimeline
}

export { getTransformedTimeline }
