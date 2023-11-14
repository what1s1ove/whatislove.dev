import { createElement } from '~/helpers/helpers.js'

const getPlayerElement = (source) => {
  return createElement(`
    <audio class="visually-hidden" preload="auto" src="${source}">
  `)
}

export { getPlayerElement }
