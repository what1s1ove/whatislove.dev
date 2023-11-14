import { Home } from '~/components/home/home.js'
import { WhatisloveMath, timelineApi, storage } from '~/services/services.js'

const home = new Home({
  timelineApi,
  storage,
})

const init = () => {
  home.init()

  window.WhatisloveMath = WhatisloveMath
}

init()
