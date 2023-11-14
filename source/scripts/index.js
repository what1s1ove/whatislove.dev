import { Home } from '~/components/home/home.js'
import { storage, timelineApi, WhatisloveMath } from '~/services/services.js'

const home = new Home({
  timelineApi,
  storage,
})

const init = () => {
  home.init()

  window.WhatisloveMath = WhatisloveMath
}

init()
