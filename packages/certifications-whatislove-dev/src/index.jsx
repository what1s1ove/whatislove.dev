import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from '~/libs/components/components.js'

render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>,
	document.querySelector(`#root`),
)
