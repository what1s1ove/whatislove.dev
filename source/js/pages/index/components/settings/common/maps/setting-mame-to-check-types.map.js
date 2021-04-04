import { SettingName } from '~/common/enums'
import { getCheckTypes } from '../../helpers'

const settingNameToCheckTypes = {
  [SettingName.THEME]: getCheckTypes({
    checked: `dark`,
    unchecked: `light`,
  }),
  [SettingName.MOTION]: getCheckTypes({
    checked: `no-preference`,
    unchecked: `reduce`,
  }),
}

export { settingNameToCheckTypes }
