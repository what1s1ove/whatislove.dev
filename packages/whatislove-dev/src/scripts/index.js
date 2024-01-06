import { storage } from '~/libs/modules/storage/storage.js'
import { WhatisloveMath } from '~/libs/modules/whatislove-math/whatislove-math.package.js'
import { timelineApi } from '~/modules/timeline/timeline.js'
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
