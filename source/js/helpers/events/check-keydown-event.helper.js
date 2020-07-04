const checkKeydownEvent = (evt, key, action) => {
  if (evt.key === key) action()
}

export { checkKeydownEvent }
