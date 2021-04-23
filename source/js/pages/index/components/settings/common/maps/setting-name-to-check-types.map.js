import { SettingName } from '~/common/enums/enums.js'
import { getCheckTypes } from '../../helpers/helpers.js'

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
