import { SettingName } from '~/common/enums'
import { getCheckTypes } from '../../helpers'

const settingNameToCheckTypes = {
  [SettingName.THEME]: getCheckTypes({
    checked: `dark`,
    unchecked: `light`,
  }),
  [SettingName.MOTION]: getCheckTypes({
    checked: `noPreference`,
    unchecked: `reduce`,
  }),
}

export { settingNameToCheckTypes }
