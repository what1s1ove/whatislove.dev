import { createElement } from '~/helpers'

const getLoaderElement = () => {
  return createElement(`
    <svg class="loader" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" />
    </svg>
  `)
}

export { getLoaderElement }
