import { Route, Routes } from '~/libs/components/components.js'
import { AppRoute, CertificationType } from '~/libs/enums/enums.js'
import { FC } from '~/libs/types/types.js'
import { Certificate } from '~/pages/certificate/certificate.jsx'
import { NotFound } from '~/pages/not-found/not-found.jsx'

import './styles.css'

let certificationTypes = Object.values(CertificationType)

/** @type {FC} */
let App = () => (
	<Routes>
		{certificationTypes.map((it) => (
			<Route
				element={<Certificate certificationType={it} />}
				key={it}
				path={`/${it}${AppRoute.$USER_ID}`}
			/>
		))}
		<Route element={<NotFound />} path={AppRoute.ANY} />
	</Routes>
)

export { App }
