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
    return Array.from({ length: count }).fill(boostEntity)
  }

  static calculateProfessionalLevel(initialValue = 0, ...boostEntities) {
    const { NOTHING_TODO_VALUE, BoostEntity, boostEntityToProfessionalValue } =
      WhatisloveMath

    const hasBoostEntities = boostEntities.length > 0

    if (!hasBoostEntities) {
      return (initialValue -= NOTHING_TODO_VALUE)
    }

    const flattenBoostEntities = boostEntities.flat(Number.POSITIVE_INFINITY)
    const allBoostEntities = Object.values(BoostEntity)
    const isValid = flattenBoostEntities.every((it) => {
      return allBoostEntities.includes(it)
    })

    if (!isValid) {
      throw new SyntaxError(`Unknown boost entity type`)
    }

    let professionalLevel = initialValue

    for (const boostEntity of flattenBoostEntities) {
      professionalLevel += boostEntityToProfessionalValue[boostEntity]
    }

    return professionalLevel
  }

  constructor() {}
}

export { WhatisloveMath }
