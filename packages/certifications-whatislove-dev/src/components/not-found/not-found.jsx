import { FC } from '~/common/types/types.js'

import styles from './styles.module.css'

/** @type {FC} */
let NotFound = () => (
	<section className={styles[`wrapper`]}>
		<h2 className="sr-only">Page not found</h2>
		<p className={styles[`placeholder`]}>Oops... page not found</p>
	</section>
)

export { NotFound }
