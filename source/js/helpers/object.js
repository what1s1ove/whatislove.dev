const changeObjectKey = (object, keyName, value) => {
  const changedObject = { ...object }

  const changeKey = (obj) => {
    for (let key in obj) {
      if (obj[keyName] !== undefined) {
        obj[keyName] = value
      } else if (typeof obj[key] === 'object') {
        changeKey(obj[key])
      }
    }
  }

  changeKey(changedObject)

  return changedObject
}

export { changeObjectKey }
