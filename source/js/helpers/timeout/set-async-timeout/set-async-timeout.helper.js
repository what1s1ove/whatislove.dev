const setAsyncTimeout = (cb, timeout = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve()
    }, timeout)
  })
}

export { setAsyncTimeout }
