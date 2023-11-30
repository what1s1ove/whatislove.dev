import { storage } from '~/libs/packages/storage/storage.js'
import { WhatisloveMath } from '~/libs/packages/whatislove-math/whatislove-math.package.js'
import { timelineApi } from '~/packages/timeline/timeline.js'
import { Main } from '~/pages/main/main.js'

let main = new Main({
	storage,
	timelineApi,
})

/** @returns {void} */
let init = () => {
	main.init()

	globalThis.WhatisloveMath = WhatisloveMath
}

init()
