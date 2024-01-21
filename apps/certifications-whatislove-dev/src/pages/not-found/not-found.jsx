import { FC } from '~/libs/types/types.js'

import styles from './styles.module.css'

/** @type {FC} */
let NotFound = () => (
	<div className={styles[`wrapper`]}>
		<h1 className="sr-only">Page not found</h1>
		<p className={styles[`placeholder`]}>Oops... page not found</p>
	</div>
)

export { NotFound }
