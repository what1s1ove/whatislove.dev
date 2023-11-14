let RANDOM_NUMBER_INCREMENT = 1

let getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + RANDOM_NUMBER_INCREMENT)) + min
}

export { getRandomNumber }
