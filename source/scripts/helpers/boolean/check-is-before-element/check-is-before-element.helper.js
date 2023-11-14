let checkIsBeforeElement = (elementOffset) => {
  let breakPoint = window.scrollY + document.documentElement.clientHeight

  return breakPoint >= elementOffset
}

export { checkIsBeforeElement }
