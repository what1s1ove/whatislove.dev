const debounce = (fn, delay) => {
  let timeout = null

  return (...args) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => fn.call(this, ...args), delay)
  }
}

export { debounce }
