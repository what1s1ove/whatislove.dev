import init from './app'

window.addEventListener(`load`, () => {
  if (`serviceWorker` in navigator) {
    navigator.serviceWorker.register(`../sw.js`)
  }
})

init()
