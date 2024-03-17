import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

import {
	defineCustomElement,
	parseRawStyleSheet,
} from '~/libs/helpers/helpers.js'

import styles from './styles.css?inline'

class Icon extends LitElement {
	static styles = [parseRawStyleSheet(styles)]

	@property({ attribute: `name` })
	accessor name = ``
}

defineCustomElement(`cwd-icon`, Icon)
