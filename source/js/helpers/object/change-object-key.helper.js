const changeObjectKey = (object, keyName, value) => {
  const changedObject = { ...object }

  const changeKey = (obj) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      // eslint-disable-next-line no-param-reassign
      if (obj[keyName] !== undefined) obj[keyName] = value
      else if (typeof obj[key] === `object`) changeKey(obj[key])
    }
  }

  changeKey(changedObject)

  return changedObject
}

export { changeObjectKey }
