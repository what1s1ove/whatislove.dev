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

// todo
//   cache-name: cache-node-modules
//   https://github.com/BinaryStudioAcademy/bsa-winter-2021-2022-bws/blob/development/.github/workflows/lint.yml
//   add constants (ex. CI)
