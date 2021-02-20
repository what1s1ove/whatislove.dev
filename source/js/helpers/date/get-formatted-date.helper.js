const getFormattedDate = (date) => {
  if (!date) {
    return ``
  }

  return new Date(date).toLocaleDateString(`en`, {
    month: `short`,
    year: `numeric`,
  })
}

export { getFormattedDate }
