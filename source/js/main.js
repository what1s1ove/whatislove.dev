import init from './app'

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`../sw.js`)
})

init()
