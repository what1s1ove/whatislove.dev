import { Home } from '~/components/home/home.js'
import { storage, timelineApi, WhatisloveMath } from '~/services/services.js'

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
