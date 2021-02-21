const checkIsMediaQueryMatch = (mediaQuery) => {
  return window.matchMedia(mediaQuery).matches
}

export { checkIsMediaQueryMatch }
