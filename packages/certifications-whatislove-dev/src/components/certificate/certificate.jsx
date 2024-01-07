import { CertificationType } from '~/common/enums/enums.js'
import { FC, OneOf } from '~/common/types/types.js'
import { Document, PDFViewer } from '~/components/common/common.js'
import { NotFound } from '~/components/not-found/not-found.jsx'
import { useRouter } from '~/hooks/hooks.js'

import { certificationsTypeToComponent } from './common/map/map.js'
import { RouteParameters } from './common/types/types.js'
import { getUser } from './helpers/helpers.js'
import styles from './styles.module.css'

/**
 * @typedef {{
 * 	certificationType: OneOf<typeof CertificationType>
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
