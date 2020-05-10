const formatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
})

const getFormattedDate = (date) => {
  return formatter.format(new Date(date))
}

export { getFormattedDate }
