let createSelectOptions = (options) => {
  return options.map((option) => new Option(option, option))
}

export { createSelectOptions }
