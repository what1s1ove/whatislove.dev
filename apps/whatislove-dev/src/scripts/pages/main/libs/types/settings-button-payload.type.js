import { ValuesOf } from '~/libs/types/types.js'

import { SettingButtonLabel, SettingName } from '../enums/enums.js'

/**
 * @typedef {{
 * 	isDefaultChecked: boolean
 * 	label: ValuesOf<typeof SettingButtonLabel>
 * 	name: ValuesOf<typeof SettingName>
 * 	onClick: (name: ValuesOf<typeof SettingName>, isCheck: boolean) => void
 * }}
 */
let SettingsButtonPayload

export { SettingsButtonPayload }
