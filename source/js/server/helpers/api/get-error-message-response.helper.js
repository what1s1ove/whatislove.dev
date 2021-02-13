const getErrorMessageResponse = (...messages) => ({
  message: messages.join(` `),
})

export { getErrorMessageResponse }
