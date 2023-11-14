import { Home } from '~/components/home/home.js'
import { storage, timelineApi, WhatisloveMath } from '~/services/services.js'

let home = new Home({
  timelineApi,
  storage,
})

let init = () => {
  home.init()

  window.WhatisloveMath = WhatisloveMath
}

init()
