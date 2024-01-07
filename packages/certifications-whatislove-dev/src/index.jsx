import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from '~/libs/components/components.js'

createRoot(/** @type {HTMLElement} */ (document.querySelector('#root'))).render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>,
)
