import { LitElement } from 'lit'

import {
	defineCustomElement,
	parseRawStyleSheet,
} from '~/libs/helpers/helpers.js'

import styles from './styles.css?inline'
import { property } from 'lit/decorators.js'

class Icon extends LitElement {
	static styles = [parseRawStyleSheet(styles)]

	@property({ attribute: 'name' })
	accessor name = ''
}

defineCustomElement(`cwd-icon`, Icon)
