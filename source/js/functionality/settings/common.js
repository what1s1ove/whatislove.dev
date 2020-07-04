const AttributeType = {
  THEME: `theme`,
  MOTION: `motion`,
}

const MediaBooleanMap = {
  'true': true,
  'false': false,
}

const MediaQueriesType = {
  THEME: `(prefers-color-scheme: dark)`,
  MOTION: `(prefers-reduced-motion: no-preference)`,
}

const ThemeCheckType = {
  CHECKED: `dark`,
  UNCHECKED: `light`,
}

const MotionCheckType = {
  CHECKED: `noPreference`,
  UNCHECKED: `reduce`,
}

export {
  AttributeType,
  MediaBooleanMap,
  MediaQueriesType,
  ThemeCheckType,
  MotionCheckType,
}
