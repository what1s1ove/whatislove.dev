let addSelectOptions = (selectNode, options) => {
  for (let option of options) {
    selectNode.add(option)
  }
}

export { addSelectOptions }
