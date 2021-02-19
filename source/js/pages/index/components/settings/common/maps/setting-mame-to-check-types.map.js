import { getCheckTypes } from '../../helpers'
import { SettingName } from '../enums'

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
