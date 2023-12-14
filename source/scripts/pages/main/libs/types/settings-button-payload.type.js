/** @typedef {typeof import('../enums/enums.js').SettingButtonLabel} SettingButtonLabel */
/** @typedef {typeof import('../enums/enums.js').SettingName} SettingName */

/**
 * @typedef {{
 * 	isDefaultChecked: boolean
 * 	label: SettingButtonLabel[keyof SettingButtonLabel]
 * 	name: SettingName[keyof SettingName]
 * 	onClick: (name: SettingName[keyof SettingName], isCheck: boolean) => void
 * }} SettingsButtonPayload
 */

export {}
