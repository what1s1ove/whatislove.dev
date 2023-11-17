/**
 * @param {(...args: unknown[]) => unknown} callback
 * @param {number} delay
 * @returns {(...args: unknown[]) => unknown}
 */
let debounce = (callback, delay) => {
  let /** @type {undefined | number} */ timeout

  return (...arguments_) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => callback.call(undefined, ...arguments_), delay)
  }
}

export { debounce }
