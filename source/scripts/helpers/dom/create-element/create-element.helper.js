let createElement = (template) => {
  let newElement = document.createElement(`div`)

  newElement.innerHTML = template

  return newElement.firstElementChild
}

export { createElement }
