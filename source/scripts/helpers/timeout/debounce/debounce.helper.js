let debounce = (callback, delay) => {
  let timeout

  return (...arguments_) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => callback.call(undefined, ...arguments_), delay)
  }
}

export { debounce }
