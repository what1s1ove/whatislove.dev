let getServerApiUrl = ({ apiPrefix = ``, host = ``, port = 0 } = {}) => {
  return `${host}${port}${apiPrefix}`
}

export { getServerApiUrl }
