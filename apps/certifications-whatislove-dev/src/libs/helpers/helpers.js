import { Font, StyleSheet } from '@react-pdf/renderer'

let { create: createPdfStyles } = StyleSheet
let { register: registerFonts } = Font

export { getFormattedDate } from '@whatislove.dev/shared'
export { createPdfStyles, registerFonts }
