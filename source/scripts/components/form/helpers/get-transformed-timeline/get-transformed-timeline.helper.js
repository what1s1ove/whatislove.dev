let getTransformedTimeline = (timeline) => {
  let transformedTimeline = { ...timeline }

  for (let key of Object.keys(transformedTimeline)) {
    transformedTimeline[key] = transformedTimeline[key] ?? ``
  }

  return transformedTimeline
}

export { getTransformedTimeline }
