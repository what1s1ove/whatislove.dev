import { AppRoute, CertificationType } from '~/common/enums/enums.js'
import { FC } from '~/common/types/types.js'
import { Certificate } from '~/components/certificate/certificate.jsx'
import { Route, Routes } from '~/components/common/common.js'
import { NotFound } from '~/components/not-found/not-found.jsx'

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
