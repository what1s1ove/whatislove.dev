import { Font, StyleSheet } from '@react-pdf/renderer'

let { create: createPdfStyles } = StyleSheet
let { register: registerFonts } = Font

export { createPdfStyles, registerFonts }
export { getFormattedDate } from './get-formatted-date/get-formatted-date.helper.js'
