let RANDOM_NUMBER_INCREMENT = /** @type {const} */ (1)

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
let getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + RANDOM_NUMBER_INCREMENT)) + min
}

export { getRandomNumber }
