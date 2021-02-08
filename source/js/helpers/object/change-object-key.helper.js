const changeObjectKey = (object, keyName, value) => {
  const changedObject = { ...object }

  const changeKey = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[keyName] !== undefined) {
        obj[keyName] = value
      } else if (typeof obj[key] === `object`) {
        changeKey(obj[key])
      }
    })
  }

  changeKey(changedObject)

  return changedObject
}

export { changeObjectKey }
