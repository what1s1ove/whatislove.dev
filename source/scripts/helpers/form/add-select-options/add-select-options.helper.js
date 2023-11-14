const addSelectOptions = (selectNode, options) => {
  for (const option of options) {
    selectNode.add(option)
  }
}

export { addSelectOptions }
