import { CertificationType } from '~/common/enums/enums.js'

import {
	Bsa2022,
	Decorators,
	Nodejs2022,
	Webcomponents2022,
} from '../../../components/components.js'

let certificationsTypeToComponent = /** @type {const} */ ({
	[CertificationType.BSA_2022]: Bsa2022,
	[CertificationType.DECORATORS]: Decorators,
	[CertificationType.NODEJS_2022]: Nodejs2022,
	[CertificationType.WEBCOMPONENTS_2022]: Webcomponents2022,
})

export { certificationsTypeToComponent }
