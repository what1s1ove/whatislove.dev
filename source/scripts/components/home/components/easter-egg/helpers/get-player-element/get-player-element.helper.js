import { createElement } from '~/helpers/helpers.js'

let getPlayerElement = (source) => {
  return createElement(`
    <audio class="visually-hidden" preload="auto" src="${source}">
  `)
}

export { getPlayerElement }
