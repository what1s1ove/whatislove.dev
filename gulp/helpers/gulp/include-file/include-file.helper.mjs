const includeFile = (path, shouldInclude) => {
  return `${shouldInclude ? `` : `!`}${path}`
}

export { includeFile }
