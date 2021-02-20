const checkIsBeforeElement = (elementOffset) => {
  const breakPoint = window.scrollY + document.documentElement.clientHeight

  return breakPoint >= elementOffset
}

export { checkIsBeforeElement }
