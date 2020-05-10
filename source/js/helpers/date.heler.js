const formatter = new Intl.DateTimeFormat(`en`, {
  month: `short`,
  year: `numeric`,
})

const getFormattedDate = (date) => {
  const parsedDate = date.replace(/-/g, '/')

  console.log(date, parsedDate);
  

  return formatter.format(new Date(date))
}

export { getFormattedDate }
