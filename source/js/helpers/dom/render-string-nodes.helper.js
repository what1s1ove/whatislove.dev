const renderStringNodes = (container, stringNodes) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = ``

  container.insertAdjacentHTML(`afterbegin`, stringNodes.join(``))
}

export { renderStringNodes }
