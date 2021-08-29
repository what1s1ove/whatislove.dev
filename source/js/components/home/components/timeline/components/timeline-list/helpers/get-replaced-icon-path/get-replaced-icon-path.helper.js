const getReplacedIconPath = (path, type) => {
  return path.replace(/timeline-(.*)\./, `timeline-${type}.`)
}

export { getReplacedIconPath }
