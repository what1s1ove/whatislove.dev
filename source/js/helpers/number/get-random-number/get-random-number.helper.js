const RANDOM_NUMBER_INCREMENT = 1

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + RANDOM_NUMBER_INCREMENT)) + min
}

export { getRandomNumber }
