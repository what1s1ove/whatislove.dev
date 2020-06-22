const changeObjectKey = (object, keyName, value) => {
  let changedObject = { ...object }

  let changeKey = (obj) => {
    // eslint-disable-next-line curly, no-restricted-syntax
    for (let key in obj) {
      // eslint-disable-next-line no-param-reassign
      if (obj[keyName] !== undefined) obj[keyName] = value
      else if (typeof obj[key] === `object`) changeKey(obj[key])
    }
  }

  changeKey(changedObject)

  return changedObject
}

export { changeObjectKey }
