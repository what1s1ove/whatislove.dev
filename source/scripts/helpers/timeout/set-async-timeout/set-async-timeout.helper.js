let setAsyncTimeout = (callback, timeout = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback()
      resolve()
    }, timeout)
  })
}

export { setAsyncTimeout }
