import del from 'del'

const clean = () => del(`build`)

export { clean }
