const checkIsReferToAnotherNode = (currentNode, ...checkNodes) => {
  return checkNodes.some((checkNode) => {
    return Boolean(checkNode.elements?.[currentNode.name])
  })
}

export { checkIsReferToAnotherNode }
