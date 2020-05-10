const AttributeTypes = {
  THEME: `theme`,
  MOTION: `motion`,
}

const MediaQueriesTypes = {
  THEME: `(prefers-color-scheme: dark)`,
  MOTION: `(prefers-reduced-motion: no-preference)`,
}

const ColorThemeTypes = {
  DARK: `dark`,
  LIGHT: `light`,
}

const MotionTypes = {
  NOT_PREFERENCE: `noPreference`,
  REDUCE: `reduce`,
}

export { AttributeTypes, MediaQueriesTypes, ColorThemeTypes, MotionTypes }
