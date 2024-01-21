import { Document, PDFViewer } from '~/libs/components/components.js'
import { CertificationType } from '~/libs/enums/enums.js'
import { useRouter } from '~/libs/hooks/hooks.js'
import { FC, ValuesOf } from '~/libs/types/types.js'
import { NotFound } from '~/pages/not-found/not-found.jsx'

import { getUser } from './libs/helpers/helpers.js'
import { certificationsTypeToComponent } from './libs/map/map.js'
import { RouteParameters } from './libs/types/types.js'
import styles from './styles.module.css'

/**
 * @typedef {{
 * 	certificationType: ValuesOf<typeof CertificationType>
 * }}
 */
let Properties

/** @type {FC<Properties>} */
let Certificate = ({ certificationType }) => {
	let { params } = useRouter()
	let user = getUser(
		certificationType,
		/** @type {RouteParameters} */ (params).userId,
	)
	let Cert = certificationsTypeToComponent[certificationType]

	if (!user) {
		return <NotFound />
	}

	return (
		<PDFViewer className={/** @type {string} */ (styles[`viewer`])}>
			<Document>
				<Cert user={user} />
			</Document>
		</PDFViewer>
	)
}

export { Certificate }
