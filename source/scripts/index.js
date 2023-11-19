import { storage } from '~/libs/packages/storage/storage.js'
import { WhatisloveMath } from '~/libs/packages/whatislove-math/whatislove-math.package.js'
import { timelineApi } from '~/packages/timeline/timeline.js'
import { Home } from '~/pages/home/home.js'

let home = new Home({
	storage,
	timelineApi,
})

/** @returns {void} */
let init = () => {
	home.init()

	globalThis.WhatisloveMath = WhatisloveMath
}

init()
