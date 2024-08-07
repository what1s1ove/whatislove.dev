import { ValuesOf } from '~/libs/types/types.js'

class WhatisloveMath {
	static BoostEntity = /** @type {const} */ ({
		BOOK: `book`,
		COURSE: `course`,
		MENTEE: `mentee`,
	})

	static boostEntityToProfessionalValue = /** @type {const} */ ({
		[WhatisloveMath.BoostEntity.BOOK]: 1,
		[WhatisloveMath.BoostEntity.COURSE]: 3,
		[WhatisloveMath.BoostEntity.MENTEE]: 10,
	})

	static NOTHING_TODO_VALUE = /** @type {const} */ (10)

	/**
	 * @param {number} initialValue
	 * @param {ValuesOf<WhatisloveMath.BoostEntity>[]} boostEntities
	 * @returns {number}
	 * @throws {SyntaxError}
	 */
	static calculateProfessionalLevel(initialValue = 0, ...boostEntities) {
		let {
			BoostEntity,
			boostEntityToProfessionalValue,
			NOTHING_TODO_VALUE,
		} = WhatisloveMath

		let hasBoostEntities = boostEntities.length > 0

		if (!hasBoostEntities) {
			return (initialValue -= NOTHING_TODO_VALUE)
		}

		let flattenBoostEntities = boostEntities.flat(Number.POSITIVE_INFINITY)
		let allBoostEntities = Object.values(BoostEntity)
		let isValid = flattenBoostEntities.every((it) => {
			return allBoostEntities.includes(it)
		})

		if (!isValid) {
			throw new SyntaxError(`Unknown boost entity type`)
		}

		let professionalLevel = initialValue

		for (let boostEntity of flattenBoostEntities) {
			professionalLevel += boostEntityToProfessionalValue[boostEntity]
		}

		return professionalLevel
	}

	/**
	 * @param {ValuesOf<WhatisloveMath.BoostEntity>} boostEntity
	 * @param {number} count
	 * @returns {ValuesOf<WhatisloveMath.BoostEntity>[]}
	 */
	static multiplyBoostEntities(boostEntity, count = 0) {
		return Array.from({ length: count }, () => boostEntity)
	}
}

export { WhatisloveMath }
