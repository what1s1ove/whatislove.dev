import { PDFPath, PDFSvg } from '~/libs/components/components.js'
import { FC, PdfStyle } from '~/libs/types/types.js'

/**
 * @typedef {{
 * 	style: PdfStyle
 * }}
 */
let Properties

/** @type {FC<Properties>} */
let Logo = ({ style }) => (
	<PDFSvg style={style} viewBox="0 0 250 143">
		<PDFPath
			d="M142.857 17.8572L160.714 0L196.429 35.7143L232.143 0L250 17.8572L196.429 71.4286L142.857 17.8572Z"
			fill="#FD290D"
		/>
		<PDFPath
			d="M89.2857 0L71.4286 17.8572L160.714 107.143L178.572 89.2858L89.2857 0Z"
			fill="#1F1A19"
		/>
		<PDFPath
			d="M125 142.857L142.857 125L17.8572 3.85098e-05L0 17.8572L125 142.857Z"
			fill="#1F1A19"
		/>
	</PDFSvg>
)

export { Logo }
