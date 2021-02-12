// eslint-disable-next-line arrow-body-style
const checkIsOneOf = (checkItem, ...checksItems) => {
  return checksItems.some((item) => item === checkItem)
}

export { checkIsOneOf }
