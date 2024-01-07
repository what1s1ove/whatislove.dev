import { useLocation, useParams } from 'react-router-dom'

import { useMemo } from '~/libs/hooks/hooks.js'

/**
 * @template {Record<string, string>} P
 * @returns {{
 * 	pathname: string
 * 	params: P
 * }}
 */
let useRouter = () => {
	let parameters = /** @type {P} */ (useParams())
	let location = useLocation()

	return useMemo(
		() => ({
			params: parameters,
			pathname: location.pathname,
		}),
		[parameters, location],
	)
}

export { useRouter }
