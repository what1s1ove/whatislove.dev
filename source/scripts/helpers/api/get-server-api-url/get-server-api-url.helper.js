let getServerApiUrl = ({ host = ``, port = 0, apiPrefix = `` } = {}) => {
  return `${host}${port}${apiPrefix}`
}

export { getServerApiUrl }
