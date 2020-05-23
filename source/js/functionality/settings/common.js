const AttributeTypes = {
  THEME: `theme`,
  MOTION: `motion`,
}

const MediaBooleanTypes = {
  true: true,
  false: false,
}

const MediaQueriesTypes = {
  THEME: `(prefers-color-scheme: dark)`,
  MOTION: `(prefers-reduced-motion: no-preference)`,
}

const ThemeCheckTypes = {
  checked: `dark`,
  unchecked: `light`,
}

const MotionCheckTypes = {
  checked: `noPreference`,
  unchecked: `reduce`,
}

export {
  AttributeTypes,
  MediaQueriesTypes,
  ThemeCheckTypes,
  MotionCheckTypes,
  MediaBooleanTypes,
}
