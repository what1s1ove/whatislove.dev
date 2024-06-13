import { Page, Text, View } from '~/libs/components/components.js'
import { getFormattedDate } from '~/libs/helpers/helpers.js'
import { CertificationPayload, FC } from '~/libs/types/types.js'

import { Logo, Seal, Signature, Stars } from './components/components.js'
import { styles } from './styles.js'

/**
 * @typedef {{
 * 	payload: CertificationPayload
 * }}
 */
let Properties

/** @type {FC<Properties>} */
let InitialCertificate = ({ payload }) => (
	<Page orientation="portrait" size="A4">
		<View style={styles.page}>
			<Stars style={styles.background} />
			<View style={styles.wrapper}>
				<View style={styles.logoWrapper}>
					<Logo style={styles.logo} />
					<Text style={styles.logoText}>whatislove academy</Text>
				</View>
				<View style={styles.userNameWrapper}>
					<Text style={styles.userNameIntro}>
						This certificate confirms that
					</Text>
					<Text style={styles.userName}>{payload.userName}</Text>
				</View>
				<View style={styles.bodyWrapper}>
					<Text style={styles.bodyIntro}>
						successfully completed training
					</Text>
					<Text style={styles.bodyName}>{payload.title}</Text>
					<Text style={styles.bodyDate}>
						{getFormattedDate(payload.completeDate, `M_D_YEAR`)}
					</Text>
				</View>
				<View style={styles.footerWrapper}>
					<View style={styles.mentors}>
						<Text style={styles.mentorsTitle}>Mentors</Text>
						{payload.mentors.map((it) => (
							<Text key={it} style={styles.footerName}>
								{it}
							</Text>
						))}
					</View>
					<View style={styles.manager}>
						<Text style={styles.managerTitle}>Project manager</Text>
						<Text style={styles.managerName}>
							{payload.manager}
						</Text>
						<Signature style={styles.signature} />
						<Seal style={styles.seal} />
					</View>
				</View>
			</View>
		</View>
	</Page>
)

export { InitialCertificate }
