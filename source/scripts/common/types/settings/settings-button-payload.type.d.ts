import { SettingButtonLabel, SettingName } from '~/common/enums/enums.js'

type SettingButtonPayload = {
  isDefaultChecked: boolean
  label: (typeof SettingButtonLabel)[keyof typeof SettingButtonLabel]
  name: (typeof SettingName)[keyof typeof SettingName]
  onClick: (
    name: (typeof SettingName)[keyof typeof SettingName],
    isCheck: boolean,
  ) => void
}

export { type SettingButtonPayload }
