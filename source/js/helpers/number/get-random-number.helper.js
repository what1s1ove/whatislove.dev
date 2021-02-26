const RANDOM_NUMBER_INCREMENT = 1

const getRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + RANDOM_NUMBER_INCREMENT)) + min

  return randomNumber
}

export { getRandomNumber }
