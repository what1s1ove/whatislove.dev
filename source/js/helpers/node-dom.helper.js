const setAttribute = (element, attr, value) => {
  element.setAttribute(attr, value)
}

const outputStringNodes = (container, stringNodes) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = ``

  container.insertAdjacentHTML(`afterbegin`, stringNodes.join(``))
}

export { setAttribute, outputStringNodes }
