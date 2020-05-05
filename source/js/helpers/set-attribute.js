const setAttribute = (attr, value) => {
  document.documentElement.setAttribute(`data-${attr}`, value)
}

export { setAttribute }
