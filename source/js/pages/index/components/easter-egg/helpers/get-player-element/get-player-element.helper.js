import { createElement } from '~/helpers'

const getPlayerElement = (src) => {
  return createElement(`
    <audio class="visually-hidden" preload="auto" src="${src}">
  `)
}

export { getPlayerElement }
