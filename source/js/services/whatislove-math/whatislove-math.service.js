class WhatisloveMath {
  static NOTHING_TODO_VALUE = 10

  static BoostEntity = {
    BOOK: `book`,
    COURSE: `course`,
    MENTEE: `mentee`,
  }

  static boostEntityToProfessionalValue = {
    [WhatisloveMath.BoostEntity.BOOK]: 1,
    [WhatisloveMath.BoostEntity.COURSE]: 3,
    [WhatisloveMath.BoostEntity.MENTEE]: 10,
  }

  static multiplyBoostEntities(boostEntity, count = 0) {
    return new Array(count).fill(boostEntity)
  }

  static calculateProfessionalLevel(initialValue = 0, ...boostEntities) {
    const { NOTHING_TODO_VALUE, BoostEntity, boostEntityToProfessionalValue } =
      WhatisloveMath

    const hasBoostEntities = Boolean(boostEntities.length)

    if (!hasBoostEntities) {
      return (initialValue -= NOTHING_TODO_VALUE)
    }

    const flattenBoostEntities = boostEntities.flat(Infinity)
    const allBoostEntities = Object.values(BoostEntity)
    const isValid = flattenBoostEntities.every((it) => {
      return allBoostEntities.includes(it)
    })

    if (!isValid) {
      throw new SyntaxError(`Unknown boost entity type`)
    }

    return flattenBoostEntities.reduce(
      (acc, it) => (acc += boostEntityToProfessionalValue[it]),
      initialValue,
    )
  }
}

export { WhatisloveMath }
