const setAttribute = (attr, value) => {
  document.documentElement.setAttribute(`data-${attr}`, value)
}

const checkNodeHasClass = (node, className) => {
  const hasClass = node.classList.contains(className)

  return hasClass
}

export { setAttribute, checkNodeHasClass }
